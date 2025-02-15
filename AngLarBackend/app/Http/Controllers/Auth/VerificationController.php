<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Models\Customer;
use Illuminate\Support\Facades\URL;



class VerificationController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = Customer::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Érvénytelen hitelesítési link'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Az e-mail már megerősítve lett']);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return response()->json(['message' => 'E-mail sikeresen megerősítve']);
    }
}
