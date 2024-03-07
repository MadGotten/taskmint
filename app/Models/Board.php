<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'user_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_board');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class, 'board_id');
    }
}
