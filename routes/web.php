<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', [BoardController::class, 'index'])
->middleware(['auth', 'verified'])
->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('board', BoardController::class);

    Route::resource('board.task', TaskController::class);
    //Route::get('/task/create', [TaskController::class, 'create'])->name('task.create');
    //Route::get('/task/{id}/edit', [TaskController::class, 'edit'])->name('task.edit');
    //Route::post('/task', [TaskController::class, 'store'])->name('task.store');
    //Route::delete('/task/{id}', [TaskController::class, 'destroy'])->name('task.destroy');
    //Route::patch('/task/{id}', [TaskController::class, 'update'])->name('task.update');
});

require __DIR__.'/auth.php';
