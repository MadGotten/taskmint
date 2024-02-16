<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boards = Auth::user()->boards()->get();
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
        $user = Auth::user();

        $board = $user->boards()->create($request->validated());

        $board->save();

        $boards = Auth::user()->boards()->get();
        return Inertia::render('Dashboard', [
            'boards' => $boards,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tasks = Auth::user()->boards()->findOrFail($id)->tasks()->get();
        return Inertia::render('Board/Show', [
            'board_id' => $id,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
