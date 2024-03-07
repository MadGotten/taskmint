import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function TaskForm({ auth, submit, deleteUser, data, setData, errors, processing, recentlySuccessful, children}) {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name"/>
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    isFocused
                    spellCheck="false"
                />
                <InputError className="mt-2" message={errors.name}/>
            </div>

            <div>
                <InputLabel htmlFor="email" value="Add user to board"/>
                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    isFocused
                    spellCheck="false"
                />
                <InputError className="mt-2" message={errors.email}/>
            </div>

            <div className="flex flex-col gap-2 text-sm w-40">
            {data.users.map((user, index) => (
                <span key={user.id} className="inline-flex items-center justify-between">
                    {user.email}
                    {auth.id!==user.id &&
                    <button type="button" onClick={() => deleteUser(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-x">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                    }
                </span>
            ))}
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
