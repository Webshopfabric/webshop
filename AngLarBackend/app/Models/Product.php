<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'name', 'description',
        'price', 'stock', 'image'
    ];

    // Kapcsolat: egy termék több rendeléshez tartozhat
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
                    ->withPivot('quantity', 'price_at_time_of_order') // Pivot adatok
                    ->withTimestamps(); // Automatikus időbélyegek
    }
}




