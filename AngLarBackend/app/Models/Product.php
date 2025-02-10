<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // A tábla neve, ha nem az alapértelmezett 'products' tábla lenne
    protected $table = 'products';

    // Azok a mezők, amik tömeges hozzárendeléssel (mass assignment) kitölthetők
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

    // A slug mező automatikus generálásához (SEO barát URL)
    public static function boot()
    {
        parent::boot();

        static::saving(function ($product) {
            // Ha nincs megadva slug, automatikusan generálunk egyet
            if (empty($product->slug)) {
                $product->slug = \Str::slug($product->title);
            }
        });
    }

    // Kapcsolat a kategóriával
    public function category()
    {
        return $this->belongsTo(Category::class)->select('id', 'title','description'); // Csak az id-t és a title-t kérjük
        // return $this->belongsTo(Category::class);
    }

    // Akciós ár ellenőrzése
    public function hasDiscount()
    {
        return $this->discount_price !== null && $this->discount_price < $this->price;
    }
}
