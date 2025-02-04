<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'shipping_address', 'phone',
        'total_price', 'payment_method', 'status'
    ];

    // Kapcsolat: egy rendeléshez több termék
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
                    ->withPivot('quantity', 'price_at_time_of_order') // Pivot adatok
                    ->withTimestamps(); // Automatikus időbélyegek
    }




}
