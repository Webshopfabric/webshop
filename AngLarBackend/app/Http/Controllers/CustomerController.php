<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    // Regisztráció funkció
    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string|min:6|confirmed',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string',
            'role' => 'required|string|in:customer,admin',

        ],[
            'name.required' => 'A név megadása kötelező.',
        'name.regex' => 'A név csak betűket és szóközöket tartalmazhat.',
        'email.required' => 'Az e-mail cím megadása kötelező.',
        'email.email' => 'Az e-mail cím formátuma érvénytelen.',
        'email.unique' => 'Ez az e-mail cím már regisztrálva van.',
        'password.required' => 'A jelszó megadása kötelező.',
        'password.min' => 'A jelszónak legalább :min karakter hosszúnak kell lennie.',
        'password.confirmed' => 'A jelszó megerősítése nem egyezik.',
        'address.required' => 'A cím megadása kötelező.',
        'role.required' => 'A szerep megadása kötelező.',
        'role.in' => 'A szerep érvénytelen.'

        
        ]);

// if ($validator->fails()) {
//         return response()->json([
//             'errors' => $validator->errors()
//         ], 422);
//     }




        // Új customer létrehozása
        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'customer', // alapértelmezetten customer szerep
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

    // E-mail megerősítő értesítés küldése
    // $customer->sendEmailVerificationNotification();

        return response()->json([
        'message' => 'Sikeres regisztráció! Kérjük, erősítse meg az e-mail címét.',
        'customer' => $customer
    ], 201);
}

    // Bejelentkezés funkció
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json(['message' => 'Hibás email vagy jelszó!'], 401);
        }

        // Ideálisan itt egy token generálása történne (pl. JWT token)
        return response()->json([
            'message' => 'Sikeres bejelentkezés!',
            'customer' => $customer
        ]);
    }

    // A felhasználói adatokat lekérdező funkció
    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json([
            'customer' => $customer
        ]);
    }

    // A felhasználói adatok frissítése
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $customer->update($request->all());

        return response()->json([
            'message' => 'Sikeres frissítés!',
            'customer' => $customer
        ]);
    }
    // Az összes customer lekérdezése
    // public function getAllCustomers()
    // {
    //     $customers = Customer::all(); // Visszaadja az összes customer-t
    //     // $customers = Customer::paginate(10); // 10-es oldalankénti lapozás
    //     return response()->json([
    //         'customers' => $customers
    //     ]);
    // }




    public function getAllCustomers(Request $request)
{
    $query = Customer::query();

    if ($request->has('name')) {
        $query->where('name', 'like', '%' . $request->input('name') . '%');
    }

    if ($request->has('email')) {
        $query->where('email', 'like', '%' . $request->input('email') . '%');
    }

    if ($request->has('role')) {
        $query->where('role', $request->input('role'));
    }

    $customers = $query->get(); // Ha nincs szűrés, akkor az összeset visszaadja

    return response()->json([
        'customers' => $customers
    ]);
}

}

