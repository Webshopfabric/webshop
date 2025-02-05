<?php

namespace App\Http\Controllers\Api;

use App\Models\Product; // Itt importáld a Product modellt
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    public function index()
    {
        $products = Product::with('category:id,title') // Csak az id és title mezőt töltjük be
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'category_id' => $product->category_id,
                    'category' => $product->category->title, // Csak a kategória neve
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'price' => $product->price,
                    'discount_price' => $product->discount_price,
                    'stock' => $product->stock,
                    'image_url' => $product->image_url,
                    'stars' => $product->stars,
                    'is_active' => $product->is_active,
                ];
            });

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product, 200);
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->update($request->all());
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
