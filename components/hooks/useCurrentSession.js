import { useEffect, useState } from "react";
import useEmployee from "./useEmployee";

function useCurrentSession({ employeeId, setLoading }) {
    const employee = useEmployee({ employeeId, setLoading });
    const [currentSession, setCurrentSession] = useState({});

    useEffect(() => {}, [employeeId, setCurrentSession, setLoading]);

    return currentSession;
}

export default useCurrentSession;
