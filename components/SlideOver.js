import { Transition } from "@headlessui/react";

function SlideOver({ isOpen, title, requestClose = () => {}, children }) {
    return (
        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <section
                    className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
                    aria-labelledby="slide-over-heading"
                >
                    <Transition
                        show={isOpen}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        {(ref) => (
                            <div ref={ref} className="h-full w-screen max-w-md">
                                <div className="h-full flex flex-col py-6 bg-white dark:bg-black shadow-xl overflow-y-scroll">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 id="slide-over-heading" className="text-lg font-medium">
                                                {title}
                                            </h2>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    onClick={requestClose}
                                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                                >
                                                    <span className="sr-only">Close panel</span>
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
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <div className="absolute inset-0 px-4 sm:px-6">{children}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Transition>
                </section>
            </div>
        </div>
    );
}

export default SlideOver;
