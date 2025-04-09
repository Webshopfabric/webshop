<?php


namespace App\Http\Controllers;

use App\Mail\TestEmail;
use App\Mail\RegistrationConfirmation;
use App\Models\Customer;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendTestEmail(Request $request)
    {
        // $recipient = 'vammosi@gmail.com'; // Közvetlenül megadjuk a címzett email címét
        
        $recipient = $request->input('recipient', 'recipient@example.com');
        Mail::to($recipient)->send(new TestEmail());
        return response()->json(['message' => 'Email sent successfully!']);
    }


    
    // ez régebben a CustomerController-ben volt, még kell a MailController-be átrakni
    public function sendRegistrationConfirmation(Request $request)
    {
        $recipient = $request->input('recipient', 'recipient@example.com');
        $customer = Customer::where('email', $recipient)->first();

        if (!$customer) {
            return response()->json(['message' => 'Customer not found!'], 404);
        }

        Mail::to($recipient)->send(new RegistrationConfirmation($customer));
        return response()->json(['message' => 'Registration confirmation email sent successfully!']);
    }
}