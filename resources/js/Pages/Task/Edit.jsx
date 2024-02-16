import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import TaskForm from './Partials/TaskForm'

export default function Edit({ auth, task, board_id }) {
    const { data, setData, patch, delete: destroy, errors, processing, recentlySuccessful } = useForm({
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date
    });

    const deleteTask = (e) => {
        e.preventDefault();

        destroy(route('board.task.destroy', { task: task, board: board_id }));
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('board.task.update', { task: task, board: board_id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task</h2>}
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Update Task Information</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update your task title, description, status and due date
                            </p>
                        </header>

                        <TaskForm submit={submit} data={data} setData={setData} errors={errors} processing={processing} recentlySuccessful={recentlySuccessful}>
                            <DangerButton onClick={deleteTask} disabled={processing}>
                                Delete task
                            </DangerButton>
                        </TaskForm>

                    </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
