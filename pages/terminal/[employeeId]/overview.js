import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";

import Spinner from "../../../components/Spinner";
import useEmployee from "../../../components/hooks/useEmployee";
import { capitalize, isToday } from "../../../shared/utils";
import { X } from "../../../components/icons";
import { useCurrentDate } from "../../../components/hooks/useCurrentDate";

function TerminalEmployee() {
    const router = useRouter();
    const employee = useEmployee();
    const currentDate = useCurrentDate();

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const [sessions, setSessions] = useState();

    useEffect(() => {
        if (!employee) {
            return;
        }

        fetch(`/api/sessions/${employee.id}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setSessions(
                    data.splice(0, 5).map((session) => ({
                        ...session,
                        startAt: new Date(session.startAt),
                    }))
                );
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setSessions, employee]);

    const sessionsView =
        !!sessions &&
        sessions.map((session) => (
            <li key={session.id}>
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-xl font-medium text-primary-600 truncate">
                                {moment(session.startAt).format("LL")}
                            </p>
                            <div className="text-gray-500">
                                <p>{`${moment(session.startAt).format("LT")} bis ${moment(
                                    session.endAt
                                ).format("LT")}`}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex justify-end mb-3">
                                <p className="px-4 py-2 inline-flex font-semibold rounded-full bg-primary-100 text-primary-800">
                                    {moment.duration(session.totalDuration).humanize()}
                                </p>
                            </div>

                            <div className="text-gray-500 text-right">
                                <p>
                                    {!session.workDuration
                                        ? "Keine"
                                        : capitalize(moment.duration(session.workDuration).humanize())}{" "}
                                    Arbeit
                                </p>
                                <p>
                                    {!session.breakDuration
                                        ? "Keine"
                                        : capitalize(moment.duration(session.breakDuration).humanize())}{" "}
                                    Pause
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ));

    return !!error ? (
        <div>
            <h1>Error</h1>
            <p>{JSON.stringify(employee)}</p>
        </div>
    ) : isLoading || !employee || !sessions ? (
        <Spinner />
    ) : (
        <>
            <Head>
                <title>Danke {employee.firstName}! 👋</title>
            </Head>
            <div className="flex flex-col h-full">
                <div className="py-6 bg-primary-500 shadow-lg">
                    <div className="container mx-auto flex flex-row justify-between items-center text-white">
                        <button type="button" onClick={() => router.push("/")}>
                            <X className="h-8 w-9" />
                        </button>
                        <div className="flex flex-col items-end">
                            <p className="text-2xl">{`${employee.firstName} ${employee.lastName}`}</p>
                            <p>{moment(currentDate).format("LT")}</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto flex-grow flex flex-col items-center justify-center">
                    <p className="text-6xl md:text-8xl font-bold mt-3 mb-12">
                        Danke {employee.firstName}! 👋
                    </p>

                    <div className="w-full overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 p-2">
                            <div className="col-span-1 bg-white shadow rounded">
                                <div className="flex flex-col p-6 text-center">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        insgesamt in der letzten Session
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-600">
                                        {capitalize(
                                            moment
                                                .duration(
                                                    sessions.find((session) => isToday(session.startAt))
                                                        .totalDuration
                                                )
                                                .humanize()
                                        )}
                                    </dd>
                                </div>
                            </div>

                            <div className="col-span-1 bg-white shadow rounded">
                                <div className="flex flex-col p-6 text-center">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        insgesamt in den letzten {sessions.length} Sessions
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-primary-600">
                                        {`${moment
                                            .duration(sessions.reduce((a, c) => a + c.totalDuration, 0))
                                            .hours()} Stunden`}
                                    </dd>
                                </div>
                            </div>

                            <div className="col-span-2 bg-white shadow rounded p-4">
                                <ul className="divide-y divide-gray-200">{sessionsView}</ul>
                            </div>
                        </div>
                    </div>
                    <p className="dark:text-white mt-3">
                        Es werden die {sessions.length} letzten Sessions angezeigt.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TerminalEmployee;
