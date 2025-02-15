<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// use App\Http\Controllers\ProductController;

// Route::get('/products', [ProductController::class, 'index']);
// Route::post('/products', [ProductController::class, 'store']);
// Route::get('/products/{id}', [ProductController::class, 'show']);
// Route::put('/products/{id}', [ProductController::class, 'update']);
// Route::delete('/products/{id}', [ProductController::class, 'destroy']);

use App\Http\Controllers\Api\ProductApiController;
Route::get('/products', [ProductApiController::class, 'index']);
Route::post('/products', [ProductApiController::class, 'store']);
Route::get('/products/{id}', [ProductApiController::class, 'show']);
Route::put('/products/{id}', [ProductApiController::class, 'update']);
Route::delete('/products/{id}', [ProductApiController::class, 'destroy']);

use App\Http\Controllers\CustomerController;

Route::post('/register', [CustomerController::class, 'register']);
Route::post('/login', [CustomerController::class, 'login']);
Route::get('/customer/{id}', [CustomerController::class, 'show']);
Route::put('/customer/{id}', [CustomerController::class, 'update']);
Route::get('/customers', [CustomerController::class, 'getAllCustomers']);

use App\Http\Controllers\CategoryController;
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories',[CategoryController::class,'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

use App\Http\Controllers\OrderController;

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);


use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);


use App\Http\Controllers\TestController;

Route::get('/send-test-email', [TestController::class, 'sendTestEmail']);

use App\Http\Controllers\Auth\VerificationController;

Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    ->middleware(['signed'])
    ->name('email.verify');
