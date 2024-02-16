import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BoardsList({ boards }) {
    return (
    <div className="p-6 text-gray-900">
        <div className="flex justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold">Your Boards:</h2>
            <Link href={route('board.create')}>
                <PrimaryButton className="gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    New Board
                </PrimaryButton>
            </Link>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {boards.length > 0 ? (
                boards.map((board) => (
                    <div key={board.id} className="max-w-full min-h-32 rounded-lg bg-gray-800">
                        <a href={route('board.show', board.id)}>
                            <div className="p-5 bg-blue-500 rounded-t-lg"></div>
                            <div className="p-5">
                                <h5 className="text-lg font-bold tracking-tight text-white">{board.name}</h5>
                            </div>
                        </a>
                    </div>
                ))
            ) : (
                <p>No boards created yet</p>
            )}
        </div>
    </div>
    );
};
