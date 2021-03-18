import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { useRouter } from "next/router";

function useEmployee({ employeeId } = {}) {
    const router = useRouter();

    if (!employeeId) {
        employeeId = router.query.employeeId;
    }

    const context = useContext(AppContext);
    const [employee, setEmployee] = useState(undefined);

    useEffect(() => {
        setEmployee(context.employees.find((e) => `${e.id}` === `${employeeId}`));
    }, [setEmployee]);

    return employee;
}

export default useEmployee;
