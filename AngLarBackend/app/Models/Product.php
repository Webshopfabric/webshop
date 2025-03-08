<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    // Az adatbázis tábla neve (opcionális, csak ha más lenne, mint 'products')
    protected $table = 'products';

    // Engedélyezett tömeges kitöltésű mezők
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'price',
        'discount_price',
        'stock',
        'image_url',
        'stars',
        'is_active',
    ];

    // Kapcsolat a kategóriával (Egy termék egy kategóriához tartozik)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Slug automatikus generálása, de csak létrehozáskor!
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
                $product->slug = Str::slug($product->title);
            
        });
    }
}

