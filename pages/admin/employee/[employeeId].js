import { useRouter } from "next/router";
import Spinner from "../../../components/Spinner";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import moment from "moment";

function TerminalEmployee() {
    const router = useRouter();
    const { employeeId } = router.query;

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetch(`/api/sessions/${employeeId}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setEmployee(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [employeeId, setEmployee, setError, setLoading]);

    const sessions =
        !!employee &&
        employee.sessions.map((session, i) => {
            return (
                <tr key={session.id} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {moment(session.startAt).format("LL")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(session.startAt).format("LT")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {!!session.endAt ? (
                            moment(session.endAt).format("LT")
                        ) : (
                            <div className="animate-pulse">Running</div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${Math.floor(
                        (session.workDuration / (1000 * 60 * 60)) % 24
                    )}h ${Math.ceil((session.workDuration / (1000 * 60)) % 60)}m`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${Math.floor(
                        (session.breakDuration / (1000 * 60 * 60)) % 24
                    )}h ${Math.ceil((session.breakDuration / (1000 * 60)) % 60)}m`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${Math.floor(
                        (session.totalDuration / (1000 * 60 * 60)) % 24
                    )}h ${Math.ceil((session.totalDuration / (1000 * 60)) % 60)}m`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">Edit</td>
                </tr>
            );
        });

    return isLoading ? (
        <Spinner />
    ) : !!error ? (
        <div>
            <h1>Error</h1>
            <p>{JSON.stringify(employee)}</p>
        </div>
    ) : (
        <>
            <AdminLayout title={`${employee.firstName} ${employee.lastName}`} noWrap={true}>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Start
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        End
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Work Duration
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Break Duration
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Total Duration
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">{sessions}</tbody>
                        </table>
                    </div>

                    <div className="col-span-1">
                        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-auto">Hallo</div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

export default TerminalEmployee;
