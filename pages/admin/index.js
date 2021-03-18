import Head from "next/head";
import SlideOver from "../../components/SlideOver";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

export default function Home() {
    const [showAddEmployeeSlide, setShowAddEmployee] = useState(false);

    return (
        <>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AdminLayout title="Übersicht">hsad</AdminLayout>

            <div className="fixed right-5 bottom-5">
                <button
                    onClick={() => setShowAddEmployee(true)}
                    className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    type="button"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>

            <SlideOver
                title="Mitarbeiter hinzufügen"
                isOpen={showAddEmployeeSlide}
                requestClose={() => setShowAddEmployee(false)}
            >
                Hallo
            </SlideOver>
        </>
    );
}
