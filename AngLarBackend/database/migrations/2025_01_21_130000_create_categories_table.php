<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });


// Teszt adatok beszúrása
// DB::table('categories')->insert([
//     ['id' => 1, 'name' => 'Cipők', 'created_at' => now(), 'updated_at' => now()],
//     ['id' => 2, 'name' => 'Televíziók', 'created_at' => now(), 'updated_at' => now()],
//     ['id' => 3, 'name' => 'Egerek', 'created_at' => now(), 'updated_at' => now()],
// ]);

 }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
