<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Board;
use App\Http\Requests\TaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->boards()->tasks()->get();
        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $board_id)
    {
        $user = Auth::user();

        $user->boards()->findOrFail($board_id);

        return Inertia::render('Task/Create', ['board_id' => $board_id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $board_id, TaskRequest $request): RedirectResponse
    {
        //$task = $board->tasks()->create($request->validated());
        $user = Auth::user();

        $board = $user->boards()->findOrFail($board_id);

        $task = $board->tasks()->create($request->validated());

        $task->save();

        return redirect()->route('board.show',['board' => $board_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $board_id, string $id)
    {
        $user = Auth::user();

        $board = $user->boards()->findOrFail($board_id);

        $task = $board->tasks()->findOrFail($id);

        return Inertia::render('Task/Edit', ['task' => $task, 'board_id' => $board_id]);
    }

    /**
     * Update the specified resource in storage.
     */

     //public function update(ProfileUpdateRequest $request): RedirectResponse
    public function update(string $board_id, TaskRequest $request, string $id)
    {
        $user = Auth::user();

        $task = $user->boards()->findOrFail($board_id)->tasks()->findOrFail($id);

        $task->update($request->validated());

        return redirect()->route('board.show',['board' => $board_id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $board_id, string $id)
    {
        $user = Auth::user();

        $task = $user->boards()->findOrFail($board_id)->tasks()->findOrFail($id);

        $task->delete();

        return redirect()->route('board.show',['board' => $board_id]);
    }
}
