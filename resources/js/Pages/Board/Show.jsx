import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import TasksList from '@/Pages/Task/Partials/TasksList'
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Show({ auth, tasks, board }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Board: ${board.name}`}</h2>
                    <Link href={route('board.edit', { board: board.id})}>
                    <PrimaryButton className="gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen">
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
                        </svg>
                        Edit board
                    </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Board"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <TasksList tasks={tasks} board_id={board.id}></TasksList>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
