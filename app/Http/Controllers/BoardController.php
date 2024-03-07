<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Board\UsersInviteController;
use App\Http\Requests\BoardRequest;
use App\Models\Board;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $boards = $user->boards()->with('users')->get();

        return Inertia::render('Dashboard', [
            'boards' => $boards,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Board/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BoardRequest $request)
    {
        $board = Board::with('users')->create($request->validated());

        $board->save();

        $board->users()->attach(Auth::id());

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();

        $board = $user->boards()->findOrFail($id);

        $tasks = $board->tasks()->get();

        return Inertia::render('Board/Show', [
            'board' => $board,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = Auth::user();

        $board = $user->boards()->with(['users' => function ($query) {
            $query->select('id', 'email');
        }])->findOrFail($id);

        return Inertia::render('Board/Edit', ['board' => $board]);
    }

    /**
     * Update the specified resource in storage.
     */

    // Fix so that user can't kick himself from board
    public function update(BoardRequest $request, string $id)
    {
        $board = Auth::user()->boards()->findOrFail($id);

        $board->update($request->safe()->only(['name']));

        $email = $request->safe()->only(['email']);

        if($email['email']){
            app(UsersInviteController::class)->store($board, $email['email']);
        }
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $board = Board::findOrFail($id);

        $board->users()->detach();

        $board->delete();

        return redirect()->route('dashboard');
    }
}
