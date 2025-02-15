<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;
use App\Models\Customer;

class TestController extends Controller
{
    public function sendTestEmail()
    {
        $user = Customer::first(); // Az első felhasználó az adatbázisból
        if (!$user) {
            return response()->json(['message' => 'Nincs felhasználó az adatbázisban'], 404);
        }

        Mail::to($user->email)->send(new EmailVerification($user));

        return response()->json(['message' => 'Teszt email elküldve ' . $user->email]);
    }
}
