import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import status from '@/config.js';

export default function TaskForm({ submit , data, setData, errors, processing, recentlySuccessful, children}) {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                    isFocused
                    spellCheck="false"
                />
                <InputError className="mt-2" message={errors.title} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <TextInput
                    id="description"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                    spellCheck="false"
                />
                <InputError className="mt-2" message={errors.description} />
            </div>

            <div>
                <InputLabel htmlFor="status" value="Status" />
                <select
                    id="status"
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    name="status"
                    defaultValue={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                >
                    {Object.entries(status).map(([key, value]) => (
                        <option key={key.toLowerCase()} value={key.toLowerCase()}>{value.label}</option>
                    ))}
                </select>
                <InputError className="mt-2" message={errors.status} />
            </div>

            <div>
                <InputLabel htmlFor="due_date" value="Due Date" />
                <TextInput
                    id="due_date"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError className="mt-2" message={errors.due_date} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                {children}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    );
}
