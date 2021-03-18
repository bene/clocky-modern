import Head from "next/head";
import { useEffect, useState } from "react";

function Spinner() {
    const [title, setTitle] = useState("⏳");

    useEffect(() => {
        const i = setInterval(() => {
            if (title === "⏳") {
                setTitle("⌛");
            } else {
                setTitle("⏳");
            }
        }, 300);
        return () => clearInterval(i);
    }, [title, setTitle]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="h-full flex items-center justify-center">
                <svg
                    className="animate-spin -ml-1 mr-3 h-16 w-16 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
        </>
    );
}

export default Spinner;
