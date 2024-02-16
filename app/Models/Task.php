<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
    ];

    protected $hidden = [
        'board_id',
    ];

    // Relationships
    public function board()
    {
        return $this->belongsTo(Board::class);
    }
}
