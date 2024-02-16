import { useState } from 'react';
import { Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import status from '@/config.js';

export default function TasksList({ tasks, board_id }) {
    const [filter, setFilter] = useState(false)
    const [state, setState] = useState({
        status: '',
        search: '',
    });

    const handleOrderChange = (e) => {
        let order = e.currentTarget.id
        if(order === state.status){
            order = ''
        }
        setState(prevState => ({
            ...prevState,
            status: order,
        }));
        setFilter(false)
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setState((prev) => ({
          ...prev,
          search: searchTerm,
        }));
    };

    const handleFilterChange = () => {
        setFilter(!filter)
    }

    const filteredTasks = tasks.filter(task => {
        const titleMatches = task.title.toLowerCase().includes(state.search.toLowerCase());
        const statusMatches = task.status.toLowerCase() === state.status.toLowerCase() || state.status === '';
        return titleMatches && statusMatches;
    });

    return (
    <div className="p-6 text-gray-900">
        <div className="flex justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold">Your Tasks:</h2>
                <TextInput
                    id="search"
                    name="search"
                    value={state.search}
                    onChange={handleSearchChange}
                    placeholder='Search'
                    type="text"
                    className="py-1 w-48 md:w-64 lg:w-80 text-sm"
                />
            <Link key={board_id} href={route('board.task.create', { board: board_id})}>
                <PrimaryButton className="gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    New Task
                </PrimaryButton>
            </Link>
        </div>
        {tasks.length > 0 ? (
            <table className="w-full table-auto text-left text-sm">
                <thead>
                    <tr className="text-xs uppercase bg-gray-300">
                        <th className="w-64 px-6 py-3">Title</th>
                        <th className="w-48 px-6 py-3">Description</th>
                        <th className="w-32 px-6 py-3">
                            <div className="relative inline-block text-left">
                                <div className="flex items-center">
                                    Status
                                    <button onClick={handleFilterChange} id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg>
                                    </button>
                                </div>

                                {filter &&
                                <div className="absolute mt-3 w-32 flex justify-center  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none normal-case">
                                <div className="py-1 flex flex-col items-center w-full">
                                    <button id="completed" onClick={handleOrderChange} className="hover:bg-gray-200 w-full px-2 py-1.5 flex items-center justify-center" ><div className='text-xs font-medium w-20 text-center py-1 rounded-full text-white bg-green-500'>Completed</div></button>
                                    <button id="pending" onClick={handleOrderChange} className="hover:bg-gray-200 w-full px-2 py-1.5 flex items-center justify-center" ><div className='text-xs font-medium w-20 text-center py-1 rounded-full text-white bg-blue-500'>Pending</div></button>
                                    <button id="todo" onClick={handleOrderChange} className="hover:bg-gray-200 w-full px-2 py-1.5 flex items-center justify-center" ><div className='text-xs font-medium w-20 text-center py-1 rounded-full text-white bg-yellow-500'>To-Do</div></button>
                                    <button id="cancelled" onClick={handleOrderChange} className="hover:bg-gray-200 w-full px-2 py-1.5 flex items-center justify-center" ><div className='text-xs font-medium w-20 text-center py-1 rounded-full text-white bg-red-500'>Cancelled</div></button>
                                    <button id="onhold" onClick={handleOrderChange} className="hover:bg-gray-200 w-full px-2 py-1.5 flex items-center justify-center" ><div className='text-xs font-medium w-20 text-center py-1 rounded-full text-white bg-gray-500'>On Hold</div></button>
                                </div>
                              </div>
                                }
                            </div>
                        </th>
                        <th className="w-32 px-6 py-3">
                            Due Date
                        </th>
                        <th className="w-16 px-6 py-3">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id} className="bg-gray-50 border-b">
                            <td className="w-64 px-6 py-4">{task.title}</td>
                            <td className="max-w-48 px-6 py-4"><p className='truncate ...'>{task.description}</p></td>
                            <td className="w-32 px-6 py-4">
                                <div className={`text-xs font-medium w-20 text-center py-1 rounded-full text-white ${status[task.status].color}`}>
                                    {status[task.status].label}
                                </div>
                            </td>
                            <td className="w-32 px-6 py-4">{task.due_date}</td>
                            <td className="w-16 px-6 py-4">
                                <a href={route("board.task.edit", { task: task, board: board_id })} className="text-blue-600 hover:underline">
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No tasks created yet</p>
        )}
    </div>
    );
};
