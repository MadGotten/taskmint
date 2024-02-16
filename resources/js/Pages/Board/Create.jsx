import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TaskForm from './Partials/TaskForm'

export default function Create({ auth }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('board.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Board</h2>}
        >
            <Head title="Board" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Create New Board</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Create your board assign a name, and start assigning your tasks
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
