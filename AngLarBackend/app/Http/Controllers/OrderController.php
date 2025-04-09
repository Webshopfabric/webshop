<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validáció
        $validated = $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
            'shipping_address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'payment_method' => 'required|string|max:50',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price_at_time_of_order' => 'required|numeric|min:0',
        ]);

        // Adatbázis tranzakció
        DB::beginTransaction();

        try {
            // Rendelés létrehozása
            $order = Order::create([
                'customer_id' => $validated['customer_id'],
                'shipping_address' => $validated['shipping_address'],
                'phone' => $validated['phone'],
                'payment_method' => $validated['payment_method'],
                'status' => 'Pending', // Alapértelmezett státusz
                'total_price' => 0, // Ezt később számoljuk ki
            ]);

            $totalPrice = 0;

            // Rendelési tételek mentése
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);

                // Ellenőrizzük, hogy van-e elegendő készlet
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("A termék ({$product->title}) készlete nem elegendő.");
                }

                // Készlet csökkentése
                $product->stock -= $item['quantity'];
                $product->save();

                // Rendelési tétel létrehozása
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price_at_time_of_order' => $item['price_at_time_of_order'],
                ]);

                // Teljes ár növelése
                $totalPrice += $item['quantity'] * $item['price_at_time_of_order'];
            }

            // Rendelés teljes árának frissítése
            $order->total_price = $totalPrice;
            $order->save();

            DB::commit();

            return response()->json(['message' => 'Rendelés sikeresen létrehozva.', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}