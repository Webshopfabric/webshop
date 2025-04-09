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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// use App\Http\Controllers\ProductController;
// Route::apiResource('products', ProductController::class);

use App\Http\Controllers\ProductController;
Route::get('/products', [ProductController::class, 'index']);
Route::middleware('auth:sanctum','role:admin')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

use App\Http\Controllers\CategoryController;
Route::get('/categories', [CategoryController::class, 'index']); // mindenkinek
Route::middleware('auth:sanctum','role:admin')->group(function () {
    Route::get('admin/categories/{id}', [CategoryController::class, 'show']);
    Route::post('admin/categories', [CategoryController::class, 'store']);
    Route::put('admin/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('admin/categories/{id}', [CategoryController::class, 'destroy']);
});

use App\Http\Controllers\CustomerController;
Route::post('/register', [CustomerController::class, 'register']);
Route::post('/login', [CustomerController::class, 'login']);


Route::middleware('auth:sanctum')->post('/logout', [CustomerController::class, 'logout']);


Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

use App\Http\Controllers\MailController;
Route::get('/send-test-email', [MailController::class, 'sendTestEmail']);
Route::get('/send-registration-confirmation', [MailController::class, 'sendRegistrationConfirmation']);
Route::get('/send-email-verification', [MailController::class, 'sendEmailVerification']);
Route::get('/verify-email', [CustomerController::class, 'verifyEmail']);


use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
// Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);
// Route::post('/password/reset/{token}', [CustomerController::class, 'resetPassword']);
// // ...

Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [CustomerController::class, 'resetPassword'])->name('password.reset');

//Route::get('/password/reset/{token}', [CustomerController::class, 'showResetForm'])->name('password.reset');


// use App\Http\Controllers\OrderController;

    // Route::get('/orders', [OrderController::class, 'index']);
    // Route::post('/orders', [OrderController::class, 'store']);
    // Route::get('/orders/{id}', [OrderController::class, 'show']);
    // Route::put('/orders/{id}', [OrderController::class, 'update']);
    // Route::delete('/orders/{id}', [OrderController::class, 'destroy']);



    // use App\Http\Controllers\CheckoutController;
    // Route::post('/checkout', [CheckoutController::class, 'checkout']); 





use App\Http\Controllers\OrderController;
Route::post('/orders', [OrderController::class, 'store']);



