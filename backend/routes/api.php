<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ApiKeyController;
use App\Http\Controllers\Api\V1\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    // 認証不要のルート
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);

    // 認証必要のルート
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::post('/auth/refresh', [AuthController::class, 'refresh']);
        Route::get('/auth/me', [AuthController::class, 'me']);

        // サービス管理
        Route::apiResource('services', ServiceController::class);
        Route::put('/services/order', [ServiceController::class, 'updateOrder'])
            ->name('services.updateOrder');

        // カテゴリ管理
        Route::get('/services/{service}/categories', [CategoryController::class, 'index'])
            ->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])
            ->name('categories.store');
        Route::get('/categories/{category}', [CategoryController::class, 'show'])
            ->name('categories.show');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])
            ->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])
            ->name('categories.destroy');
        Route::put('/services/{service}/categories/order', [CategoryController::class, 'updateOrder'])
            ->name('categories.updateOrder');

        // 記事管理
        Route::get('/services/{service}/posts', [PostController::class, 'index'])
            ->name('posts.index');
        Route::post('/posts', [PostController::class, 'store'])
            ->name('posts.store');
        Route::get('/posts/{post}', [PostController::class, 'show'])
            ->name('posts.show');
        Route::put('/posts/{post}', [PostController::class, 'update'])
            ->name('posts.update');
        Route::delete('/posts/{post}', [PostController::class, 'destroy'])
            ->name('posts.destroy');

        // API Keys
        Route::get('/services/{service}/api-keys', [ApiKeyController::class, 'index'])->name('api-keys.index');
        Route::post('/api-keys', [ApiKeyController::class, 'store'])->name('api-keys.store');
        Route::delete('/api-keys/{apiKey}', [ApiKeyController::class, 'destroy'])->name('api-keys.destroy');

        // Media
        Route::get('/services/{service}/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media', [MediaController::class, 'store'])->name('media.store');
        Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
    });
});
