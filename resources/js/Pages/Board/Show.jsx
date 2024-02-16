import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksList from '@/Pages/Task/Partials/TasksList'

export default function Show({ auth, tasks, board_id }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Board ${board_id}`}</h2>}
        >
            <Head title={`Board ${board_id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <TasksList tasks={tasks} board_id={board_id}></TasksList>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
