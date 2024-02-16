import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TaskForm from './Partials/TaskForm'

export default function Create({ auth, board_id }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        title: "",
        description: "",
        status: "todo",
        due_date: ""
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('board.task.store', {board: board_id}));
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
                            <h2 className="text-lg font-medium text-gray-900">Create New Task</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Create your task assign a title, description, status and due date
                            </p>
                        </header>

                        <TaskForm submit={submit} data={data} setData={setData} errors={errors} processing={processing} recentlySuccessful={recentlySuccessful}>
                        </TaskForm>
                    </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
