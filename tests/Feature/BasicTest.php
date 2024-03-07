<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\User;
use App\Models\Board;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BasicTest extends TestCase
{
    use RefreshDatabase;
    public function test_authenticated_user_can_visit_dashboard(): void
    {
        $user = User::factory()->create();

        Auth::login($user);

        $this->assertAuthenticated();

        $response = $this->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_visit_create_task(): void
    {
        $user = User::factory()->create();
        $board = Board::factory()->create();

        Auth::login($user);

        $this->assertAuthenticated();

        $response = $this->get('/board/1/task/create');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_create_new_task(): void
    {
        $user = User::factory()->create();
        $board = Board::factory()->create();

        Auth::login($user);

        $this->assertAuthenticated();

        $response = $this->post('/board/1/task', [
            'title' => 'new title',
            'description' => 'new description',
            'status' => 'pending',
        ]);

        $response->assertRedirect('/board/1');
    }
}
