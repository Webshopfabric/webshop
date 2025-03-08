<?php
// Összes termék lekérése
// public function index()
// {
//     // return response()->json(Product::all(), 200);
//     $products = Product::with('category:id,title')->get();
//     return response()->json($products, 200);
// }

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // 📌 **1️⃣ Összes termék lekérése**
    public function index()
    {
        $products = Product::with('category:id,title')->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'category' => $product->category ? $product->category->title : null,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'quantity' => $product->quantity,
                'discount_price' => $product->discount_price,
                'stock' => $product->stock,
                'image_url' => $product->image_url,
                'stars' => $product->stars,
                'is_active' => $product->is_active,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json($products, 200);
    }

    // 📌 **2️⃣ Egy adott termék lekérése**
    public function show($id)
    {
        $product = Product::with('category:id,title')->find($id);

        if (!$product) {
            return response()->json(['error' => 'A termék nem található.'], 404);
        }

        return response()->json([
            'id' => $product->id,
            'category_id' => $product->category_id,
            'category' => $product->category ? $product->category->title : null,
            'title' => $product->title,
            'slug' => $product->slug,
            'price' => $product->price,
            'stock' => $product->stock,
            'is_active' => $product->is_active,
        ], 200);
    }

    // 📌 **3️⃣ Új termék létrehozása**
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255|unique:products,title',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'stars' => 'integer|min:0|max:5',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        $product = Product::create($validated);
        $product->load('category:id,title'); // Betöltjük a kapcsolatot

        return response()->json([
            'message' => 'Termék sikeresen létrehozva.',
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'category' => $product->category ? $product->category->title : null,
                'title' => $product->title,
                'slug' => $product->slug,
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
                'is_active' => $product->is_active,
            ]
        ], 201);
    }

    
    // 📌 **4️⃣ Termék frissítése**
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'A termék nem található.'], 404);
        }

        $validated = $request->validate([
            'category_id' => 'exists:categories,id',
            'title' => ['required', 'string', 'max:255', Rule::unique('products')->ignore($product->id)],
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'integer|min:0',
            'image_url' => 'nullable|url',
            'stars' => 'integer|min:0|max:5',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_active'] = $validated['is_active'] ?? $product->is_active;

        $product->update($validated);
        $product->load('category:id,title'); // Frissítjük a kapcsolatot

        return response()->json([
            'message' => 'Termék sikeresen frissítve.',
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'category' => $product->category ? $product->category->title : null,
                'title' => $product->title,
                'slug' => $product->slug,
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
                'is_active' => $product->is_active,
            ]
        ], 200);
    }

    // 📌 **5️⃣ Termék törlése**
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'A termék nem található vagy már törölve lett.'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'A termék sikeresen törölve.'], 200);
    }
}
