import "../styles/globals.css";
import AppContext from "../components/AppContext";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import * as moment from "moment";

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
            {isLoading ? <Spinner /> : <Component {...pageProps} />}
        </AppContext.Provider>
    );
}

export default MyApp;
