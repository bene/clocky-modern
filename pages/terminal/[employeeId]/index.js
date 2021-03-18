import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import AppContext from "../../../components/AppContext";
import Spinner from "../../../components/Spinner";
import useEmployee from "../../../components/hooks/useEmployee";

function TerminalEmployee() {
    const context = useContext(AppContext);
    const router = useRouter();
    const { employeeId } = router.query;

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const employee = useEmployee();

    const onStartBreak = () => {};

    const onEndBreak = () => {};

    const onStartSession = () => {
        setLoading(true);

        fetch(`/api/session/${employeeId}`, {
            method: "POST",
        })
            .then((res) => {
                if (res.ok) {
                    context.employees.find((e) => `${e.id}` === `${employeeId}`).status = "Working";
                }
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEndSession = () => {
        setLoading(true);

        fetch(`/api/session/${employeeId}`, {
            method: "PATCH",
        })
            .then((res) => {
                router.push(`/terminal/${employeeId}/overview`).finally(() => {
                    context.employees.find((e) => `${e.id}` === `${employeeId}`).status = "CheckedOut";
                }).finally(() => {
                    setLoading(false);
                });
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    return isLoading || !employee ? (
        <Spinner />
    ) : !!error ? (
        <div>
            <h1>Error</h1>
            <p>{JSON.stringify(employee)}</p>
        </div>
    ) : (
        <>
            <Head>
                <title>Hallo {employee.firstName}! 👋</title>
            </Head>
            <div className="flex flex-col h-full">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-6xl md:text-8xl font-bold mt-3">Hallo {employee.firstName}! 👋</p>

                    <div className="flex flex-row mt-24 mb-12 mx-auto">
                        {employee.status === "Working" && (
                            <button
                                className="rounded-md shadow-sm text-white text-xl md:text-3xl px-8 md:px-20 py-5 md:py-14 bg-blue-400 mr-4"
                                onClick={onStartBreak}
                                disabled={isLoading}
                            >
                                Pause starten
                            </button>
                        )}

                        {employee.status === "OnPause" && (
                            <button
                                className="rounded-md shadow-sm text-white text-xl md:text-3xl px-8 md:px-20 py-5 md:py-14 bg-blue-400 mr-4"
                                onClick={onEndBreak}
                                disabled={isLoading}
                            >
                                Pause beenden
                            </button>
                        )}

                        {employee.status === "CheckedOut" ? (
                            <button
                                className="rounded-md shadow-sm text-white text-xl md:text-3xl px-8 md:px-20 py-5 md:py-14 bg-blue-400"
                                onClick={onStartSession}
                                disabled={isLoading}
                            >
                                Arbeit starten
                            </button>
                        ) : (
                            <button
                                className="rounded-md shadow-sm text-white text-xl md:text-3xl px-8 md:px-20 py-5 md:py-14 bg-blue-400"
                                onClick={onEndSession}
                                disabled={isLoading}
                            >
                                Arbeit beenden
                            </button>
                        )}
                    </div>
                </div>

                <div className="my-2 flex justify-center"></div>
            </div>
        </>
    );
}

export default TerminalEmployee;
