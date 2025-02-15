<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validáció
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Bejelentkezés
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'message' => 'Bejelentkezés sikeres!',
                'token' => $token,
            ]);
        }

        return response()->json(['message' => 'Hibás email vagy jelszó!'], 401);
    }
}
