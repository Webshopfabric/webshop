<?php

namespace App\Http\Controllers;

use App\Mail\PasswordReset;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        // Manuális validáció
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:customers,email',
        ], [
            'email.required' => 'Az e-mail cím megadása kötelező.',
            'email.email' => 'Az e-mail cím formátuma érvénytelen.',
            'email.exists' => 'A megadott e-mail cím nem található.',
        ]);

        // Ha a validáció sikertelen
        if ($validator->fails()) {
            return response()->json([
                'error' => 'A megadott adatok érvénytelenek.',
                'details' => $validator->errors(),
            ], 404);
        }

        // Felhasználó keresése
        $customer = Customer::where('email', $request->email)->first();

        // Ellenőrizd, hogy az e-mail cím verifikálva van-e
        if (is_null($customer->email_verified_at)) {
            return response()->json([
            'message' => 'Az e-mail cím nincs verifikálva. Kérjük, először erősítsd meg az e-mail címedet!',
            ], 403);
        }



        // Token generálása
        $token = Str::random(60);

        // Token mentése a felhasználóhoz
        //$customer->verification_token = $token;
        $customer->password_reset_token = $token; // A verification_token helyett a password_reset_token mezőt használjuk
        $customer->save();

        // Email küldése
        Mail::to($customer->email)->send(new PasswordReset($customer, $token));

        return response()->json(['message' => 'Jelszó-visszaállítási link elküldve.',
            'email' => $customer->email,
            'token' => $token,
        ], 200);
    }
}
