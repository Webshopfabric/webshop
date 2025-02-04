<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;  // Itt importáljuk a DB osztályt

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'category_id' => 1,
                'name' => 'Product 1',
                'description' => 'Description for product 1',
                'price' => 19.99,
                'stock' => 100,
                'image' => 'product1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'name' => 'Product 2',
                'description' => 'Description for product 2',
                'price' => 29.99,
                'stock' => 50,
                'image' => 'product2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
