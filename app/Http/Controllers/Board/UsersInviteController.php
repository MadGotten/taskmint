<?php

namespace App\Http\Controllers\Board;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\User;

class UsersInviteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Board $board,string $email)
    {
        $user = User::where('email', $email)->first();

        if($user) {

            $board->users()->syncWithoutDetaching($user->id);
        } else {
            return redirect()->back()->withErrors([
                'email' => "Email: {$email['email']} was not found"
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $board_id, string $user_id)
    {
        $board = Board::findOrFail($board_id);

        $board->users()->detach($user_id);
    }
}
