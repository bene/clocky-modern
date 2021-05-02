import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Transition } from "@headlessui/react";
import moment from "moment";

import { Check } from "./icons";

function StreamClient() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let timeouts = [];

        fetch(`/api/stream`).finally(() => {
            const socket = io();

            socket.on("notification", (newNotification) => {
                // Send system notification if possible
                if (Notification.permission === "granted") {
                    new Notification(newNotification.title, {
                        body: newNotification.body,
                    });
                    return;
                }

                setNotifications((notifications) => [newNotification, ...notifications]);
                const timeout = setTimeout(() => {
                    setNotifications((notifications) => notifications.filter((n) => n !== newNotification));
                    timeouts = timeouts.filter((t) => t !== timeout);
                }, 5000);
                timeouts.push(timeout);
            });
        });

        return () => {
            timeouts.forEach((i) => clearTimeout(i));
        };
    }, [setNotifications]);

    return (
        <div className="fixed top-0 right-0 mt-4 mr-4 grid grid-rows-1 gap-4 max-w-sm w-full z-10">
            {notifications.map((notification) => (
                <Transition
                    key={notification.id}
                    show={true}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="row-span-1 bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Check />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm font-medium text-gray-900">
                                            {notification.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {moment(notification.dateTime).format("LT")}
                                        </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{notification.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            ))}
        </div>
    );
}

export default StreamClient;
