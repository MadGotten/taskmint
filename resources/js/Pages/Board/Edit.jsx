import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton.jsx';
import BoardForm from './Partials/BoardForm.jsx'

export default function Edit({ auth, board }) {
    const { data, setData, patch, delete: destroy, errors, processing, recentlySuccessful } = useForm({
        name: board.name,
    });

    const deleteTask = (e) => {
        e.preventDefault();

        destroy(route('board.destroy', { board: board.id }));
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('board.update', { board: board.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Board: ${board.name}`}</h2>}
        >
            <Head title="Board" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Update Board Information</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update your board name
                            </p>
                        </header>

                        <BoardForm submit={submit} data={data} setData={setData} errors={errors} processing={processing} recentlySuccessful={recentlySuccessful}>
                            <DangerButton onClick={deleteTask} disabled={processing}>
                                Delete board
                            </DangerButton>
                        </BoardForm>

                    </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
