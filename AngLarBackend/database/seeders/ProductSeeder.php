<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            [
                'category_id' => 1, // Guitars
                'title' => 'Fender Stratocaster',
                'slug' => 'fender-stratocaster',
                'description' => 'A legendary electric guitar.',
                'price' => 1200.99,
                'discount_price' => 999.99,
                'stock' => 10,
                'image_url' => 'images/fender-stratocaster.jpg',
                'stars' => 5,
                'is_active' => true,
            ],
            [
                'category_id' => 2, // Drums
                'title' => 'Yamaha Drum Set',
                'slug' => 'yamaha-drum-set',
                'description' => 'A high-quality drum set for professionals.',
                'price' => 850.50,
                'discount_price' => null,
                'stock' => 5,
                'image_url' => 'images/yamaha-drum-set.jpg',
                'stars' => 4,
                'is_active' => true,
            ]
        ]);
    }
}
