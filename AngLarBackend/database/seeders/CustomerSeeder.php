<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Admin felhasználó
        \App\Models\Customer::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '+36201111111',
            'address' => 'Budapest, Admin utca 1.',
            'password' => bcrypt('admin123'),
            'role' => 'admin'
        ]);

        // Sima felhasználók
        \App\Models\Customer::create([
            'name' => 'Kovács János',
            'email' => 'kovacs.janos@example.com',
            'phone' => '+36301234567',
            'address' => 'Budapest, Példa utca 1.',
            'password' => bcrypt('password123'),
            'role' => 'customer'
        ]);

        \App\Models\Customer::create([
            'name' => 'Nagy Éva',
            'email' => 'nagy.eva@example.com',
            'phone' => '+36207654321',
            'address' => 'Budapest, Minta út 42.',
            'password' => bcrypt('password123'),
            'role' => 'customer'
        ]);
    }
}
