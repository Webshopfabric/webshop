<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['title' => 'Guitars', 'description' => 'All kinds of guitars'],
            ['title' => 'Drums', 'description' => 'Drum kits and accessories'],
            ['title' => 'Keyboards', 'description' => 'Electric and acoustic keyboards'],
            ['title' => 'Accessories', 'description' => 'Guitar picks, drum sticks, cables, etc.'],
        ]);
    }
}

