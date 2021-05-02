import { useEffect, useState } from "react";

function useCurrentDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const i = setInterval(() => {
            setDate(new Date());
        }, 5000);
        return () => clearInterval(i);
    }, []);

    return date;
}

export { useCurrentDate };
