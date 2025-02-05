<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Kategória kapcsolat
            $table->string('title'); // Termék címe
            $table->string('slug')->unique(); // SEO-barát URL
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable(); // Akciós ár
            $table->integer('stock');
            $table->string('image_url')->nullable();
            $table->integer('stars')->default(0);
            $table->boolean('is_active')->default(true); // Elérhetőség
            $table->timestamps();

            // Indexek a gyorsabb kereséshez
            $table->index('category_id');
            $table->index('title');
        });

        // Teszt adatok beszúrása
        // DB::table('products')->insert([
        //     [
        //         'category_id' => 1,
        //         'title' => 'Prémium Fekete Bőr Cipő',
        //         'slug' => 'premium-fekete-bor-cipo',
        //         'description' => 'Kiváló minőségű bőr cipő elegáns megjelenéssel.',
        //         'price' => 29990,
        //         'discount_price' => 24990,
        //         'stock' => 50,
        //         'image_url' => 'https://example.com/cipo.jpg',
        //         'stars' => 5,
        //         'is_active' => true,
        //         'created_at' => now(),
        //         'updated_at' => now()
        //     ],
        //     [
        //         'category_id' => 2,
        //         'title' => 'Ultra HD 4K Smart TV',
        //         'slug' => 'ultra-hd-4k-smart-tv',
        //         'description' => 'Lenyűgöző képminőség és intelligens funkciók.',
        //         'price' => 199990,
        //         'discount_price' => 179990,
        //         'stock' => 30,
        //         'image_url' => 'https://example.com/tv.jpg',
        //         'stars' => 4,
        //         'is_active' => true,
        //         'created_at' => now(),
        //         'updated_at' => now()
        //     ],
        //     [
        //         'category_id' => 3,
        //         'title' => 'Gaming Egér RGB Világítással',
        //         'slug' => 'gaming-eger-rgb-vilagitassal',
        //         'description' => 'Ergonomikus dizájn és testreszabható világítás.',
        //         'price' => 12990,
        //         'discount_price' => 9990,
        //         'stock' => 100,
        //         'image_url' => 'https://example.com/eger.jpg',
        //         'stars' => 4,
        //         'is_active' => true,
        //         'created_at' => now(),
        //         'updated_at' => now()
        //     ]
        // ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
