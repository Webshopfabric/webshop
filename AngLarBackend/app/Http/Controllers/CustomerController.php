<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Mail\RegistrationConfirmation;
use App\Mail\EmailVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    // Regisztráció funkció
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:customers',
                'password' => 'required|string|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|min:8|max:12|confirmed',
                'role' => 'nullable|string',
                'address' => 'nullable|string',
                'phone' => 'nullable|string',
            ],
            [
                'name.required' => 'Kell a név',
                'email.required' => 'Kell az email cím',
                'email.email' => 'Érvénytelen email cím',
                'email.unique' => 'Ez az email cím már foglalt',
                'password.required' => 'Kell a jelszó',
                'password.confirmed' => 'A jelszó megerősítése nem egyezik',
                'password.regex' => 'A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot',
                'password.min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie',
                'password.max' => 'A jelszó nem lehet hosszabb, mint 12 karakter',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $token = Str::random(60);
        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), //$request->password,
            'role' => $request->role ?? "customer",
            'address' => $request->address ?? "",
            'phone' => $request->phone ?? "",
            'verification_token' => $token,
        ]);
        // Küldjön visszaigazoló emailt
        // Mail::to($customer->email)->send(new RegistrationConfirmation($customer));
        Mail::to($customer->email)->send(new EmailVerification($customer, $token));
        return response()->json(['message' => 'Customer registered successfully', 'customer' => $customer], 201);
    }

    // Bejelentkezés funkció
    public function login(Request $request)
    {
        // Validáció
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json($validator->errors(), 422);
        }

        // Keresés az adatbázisban
        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            Log::error('Customer not found', ['email' => $request->email]);
            return response()->json(['message' => 'Hibás email !'], 401);
        }


        if (!$customer->email_verified_at) {
            Log::error('Email not verified', ['email' => $request->email]);
            return response()->json(['message' => 'Az email cím nincs megerősítve!'], 401);
        }

        // Jelszó ellenőrzés
        // Jelszó hashelése a modellben történik ($request->password !== $customer->password) { 
        if (!Hash::check($request->password, $customer->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Hibás jelszó!'], 401);
        }

        // Token generálás
        $token = $customer->createToken($customer->name . '_token')->plainTextToken;

        /// Token hozzáadása a customer objektumhoz
        $customer->token = $token;
        return response()->json([
            'success' => true,
            'message' => 'Sikeres bejelentkezés!',
            'customer' => $customer,
            //'token' => $token,
        

            
        ]);
        // kevesebb adattal
        // $token = $customer->createToken($customer->name . '_token')->plainTextToken;
        // return response()->json([
        //     'message' => 'Sikeres bejelentkezés!',
        //     'customer' => [
        //         'id' => $customer->id,
        //         'name' => $customer->name,
        //         'email' => $customer->email,
        //         'role' => $customer->role, // Feltételezve, hogy a Customer modell tartalmazza a role mezőt
        //         'token' => $token  // Token hozzáadása
        //     ]
        // ]);

        
    }

    
    // Email verifikáció funkció
    public function verifyEmail(Request $request)
    {
        $token = $request->query('token');
        $customer = Customer::where('verification_token', $token)->first();

        if (!$customer) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Érvénytelen token!'], 400);
            } else {
                return view('verify_email_error'); // Létrehozham egy hibás verifikációs nézetet is
            }
        }

        $customer->email_verified_at = now();
        $customer->verification_token = null;
        $customer->save();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Email cím sikeresen megerősítve!']);
        } else {
            return view('verify_email_success');
        }
    }

    // A felhasználói adatokat lekérdező funkció
    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json([
            'customer' => $customer
        ]);
    }

    // Az összes felhasználó lekérdezése
    public function index()
    {
        $customers = Customer::all();

        return response()->json([
            'customers' => $customers
        ]);
    }

    // A felhasználói adatok frissítése
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'sometimes|required|string|min:4|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:customers,email,' . $id,
                'password' => 'sometimes|required|string|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|min:8|max:12|confirmed',
                'role' => 'nullable|string',
                'address' => 'nullable|string',
                'phone' => 'nullable|string',
            ],
            [
                'name.required' => 'Kell a név',
                'email.required' => 'Kell az email cím',
                'email.email' => 'Érvénytelen email cím',
                'email.unique' => 'Ez az email cím már foglalt',
                'password.required' => 'Kell a jelszó',
                'password.confirmed' => 'A jelszó megerősítése nem egyezik',
                'password.regex' => 'A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot',
                'password.min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie',
                'password.max' => 'A jelszó nem lehet hosszabb, mint 12 karakter',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->only(['name', 'email', 'password', 'role', 'address', 'phone']);

        // Ha a jelszó mező ki van töltve, akkor hasheljük a jelszót
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            // Ha a jelszó mező üres, akkor távolítsuk el a $data tömbből
            unset($data['password']);
        }

        // Log the data to be updated
        Log::info('Data to be updated', ['data' => $data]);

        $customer->update($data);

        return response()->json(['message' => 'Customer updated successfully', 'customer' => $customer]);
    }

    // A felhasználó törlése
    // public function destroy($id)
    // {
    //     $customer = Customer::findOrFail($id);
    //     $customer->delete();

    //     return response()->json(['message' => 'Customer deleted successfully']);
    // }

    // A felhasználó törlése
    public function destroy($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['message' => 'A felhasználó nem található!'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'A felhasználó sikeresen törölve!']);
    }

    // Jelszó visszaállítás funkció

    public function resetPassword(Request $request)
    {
        // Token kinyerése a request body-ból
        $token = $request->input('token');
        //$customer = Customer::where('verification_token', $token)->first();
        $customer = Customer::where('password_reset_token', $token)->first(); // A password_reset_token mezőt ellenőrizzük

        if (!$customer) {
            return response()->json(['message' => 'Érvénytelen token!'], 400);
        }

        // Jelszó validálása
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|min:8|confirmed',
        ], [
            'password.required' => 'Kell a jelszó',
            'password.confirmed' => 'A jelszó megerősítése nem egyezik',
            'password.regex' => 'A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot',
            'password.min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie',
            'password.max' => 'A jelszó nem lehet hosszabb, mint 12 karakter',
            'password.confirmed' => 'A jelszó megerősítése nem egyezik',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

        // Jelszó frissítése
        $customer->password = Hash::make($request->password);
        //$customer->verification_token = null;  // Token eltávolítása
        $customer->password_reset_token = null; // Token eltávolítása
        $customer->save();

        return response()->json(['message' => 'Jelszó sikeresen visszaállítva!']);
    }





    public function showResetForm($token)
    {
        $customer = Customer::where('verification_token', $token)->first();

        if (!$customer) {
            return response()->json(['message' => 'Érvénytelen token!'], 400);
        }

        return response()->json(['token' => $token, 'email' => $customer->email]);
    }


    // Kijelentkezés funkció
    public function logout(Request $request)
    {
        // Az aktuális felhasználó tokenjének érvénytelenítése
        //$request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sikeres kijelentkezés!'], 200);
    }
}
