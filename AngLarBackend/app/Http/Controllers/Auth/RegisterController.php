<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validáció
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Új felhasználó létrehozása
        $user = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // E-mail küldés a megerősítéshez
        Mail::to($user->email)->send(new EmailVerification($user));

        return response()->json(['message' => 'Regisztráció sikeres, ellenőrizze e-mail fiókját!'], 201);
    }
}
