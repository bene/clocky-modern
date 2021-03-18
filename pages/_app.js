import { useEffect, useState } from "react";
import moment from "moment";

import "../styles/globals.css";

import AppContext from "../components/AppContext";
import StreamClient from "../components/StreamClient";
import Spinner from "../components/Spinner";

moment.locale("de");

function MyApp({ Component, pageProps }) {
    const [isLoading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await fetch(`/api/employees`);
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [setEmployees]);

    return (
        <AppContext.Provider
            value={{
                isConnected: true,
                companyName: "EVOBEND",
                employees,
            }}
        >
            <StreamClient />
            {isLoading ? <Spinner /> : <Component {...pageProps} />}
        </AppContext.Provider>
    );
}

export default MyApp;
