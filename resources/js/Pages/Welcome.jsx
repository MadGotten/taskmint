import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center min-h-screen bg-center bg-slate-900 text-white">
                <div className="fixed top-0 right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8 w-full text-center">
                    <h1 className="text-6xl uppercase font-bold mt-20">
                        Taskmint
                    </h1>
                    <div className="grid grid-cols-3 text-left mt-12 gap-4">
                        <div>
                            <span className="font-medium text-lg text-amber-700">Board Creation</span> Taskmint allows users to create customizable boards to organize tasks efficiently.
                            Users can categorize tasks based on projects, teams, or any preferred criteria,
                            enabling clear visibility and streamlined management.
                        </div>
                        <div>
                            <span className="font-medium text-lg text-cyan-700">Streamlined Workflow Management</span> Taskmint facilitates seamless workflow management by providing intuitive tools for task assignment,
                            deadline setting, and progress monitoring. With customizable status labels,
                            users can easily identify tasks that require attention, are in progress, or have been completed,
                            fostering greater efficiency and accountability within teams.
                        </div>
                        <div className="text-gray-300">
                            <span className="font-medium text-lg text-emerald-700">Task Tracking</span> Taskmint allows to track your status and data within each board,
                            users can create tasks with detailed information including status updates,
                            due dates, descriptions, and titles. This granular level of data empowers users to track progress,
                            set priorities, and collaborate effectively with team members.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
