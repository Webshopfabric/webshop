<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Termékek listázása
    public function index()
    {
        $products = Product::with('category')->paginate(10); // Kategóriával együtt
        return view('products.index', compact('products'));
    }

    // Új termék létrehozása
    public function create()
    {
        $categories = Category::all(); // Kategóriák betöltése
        return view('products.create', compact('categories'));
    }

    // Termék mentése
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'discount_price' => 'nullable|numeric|lt:price',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string',
            'stars' => 'nullable|integer|between:0,5',
            'is_active' => 'required|boolean',
        ]);

        Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    // Termék szerkesztése
    public function edit(Product $product)
    {
        $categories = Category::all();
        return view('products.edit', compact('product', 'categories'));
    }

    // Termék frissítése
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'discount_price' => 'nullable|numeric|lt:price',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string',
            'stars' => 'nullable|integer|between:0,5',
            'is_active' => 'required|boolean',
        ]);

        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    // Termék törlése
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}
