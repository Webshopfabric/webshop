<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer; // Ha a Customer modell van

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                // Ha még nincs admin, hozd létre
                if (Customer::where('email', 'admin@yourapp.com')->doesntExist()) {
                    Customer::create([
                        'name' => 'Admin User',
                        'email' => 'admin@yourapp.com',
                        'password' => bcrypt('adminpassword'), // Itt legyen egy erős jelszó
                        'role' => 'admin',
                        'email_verified_at' => now(), // Megerősített admin
                        'address' => 'Admin Address', // Példa cím
                        'phone' => '1234567890', // Példa telefon
                    ]);
                }
    }
}
