import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";

import AppContext from "../components/AppContext";
import AvatarWithName from "../components/AvatarWithName";
import {Login} from "../components/icons";

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const context = useContext(AppContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [setCurrentDate]);

    const avatars = context.employees
        .sort((a, b) => {
            if (a.status !== "CheckedOut" && b.status === "CheckedOut") {
                return -1;
            }

            if (a.status === "CheckedOut" && b.status !== "CheckedOut") {
                return 1;
            }

            return a.firstName.localeCompare(b.firstName);
        })
        .map((e) => (
            <div key={e.id} className="m-2">
                <Link href={`/terminal/${e.id}`}>
                    <a>
                        <AvatarWithName employee={e} />
                    </a>
                </Link>
            </div>
        ));

    return (
        <>
            <Head>
                <title>Terminal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto px-4 h-full flex flex-col">
                <div className="flex flex-col-reverse md:flex-row my-auto items-center my-auto">
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-wrap justify-center">{avatars}</div>
                    </div>

                    <div className="w-full md:w-1/2 my-12 md:my-0 text-center">
                        <p className="text-4xl text-blue-400 font-bold">{moment(currentDate).format("LT")}</p>
                        <p className="text-6xl md:text-8xl text-blue-500 font-bold">{context.companyName}</p>
                    </div>
                </div>
            </div>

            <div className="fixed right-5 bottom-5">
                <Link href="/admin">
                    <a>
                        <button
                            className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            type="button"
                        >
                            <Login/>
                        </button>
                    </a>
                </Link>
            </div>
        </>
    );
}
