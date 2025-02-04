<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
     // Létrehozni új terméket
     public function create()
     {
         return view('products.create');
     }

     // Az új termék mentése
     public function store(Request $request)
     {
         $request->validate([
             'name' => 'required|max:255',
             'price' => 'required|numeric',
             'stock' => 'required|integer'
         ]);

         Product::create([
             'name' => $request->name,
             'price' => $request->price,
             'stock' => $request->stock,
         ]);

         return redirect()->route('products.index');
     }

     // Az összes termék listázása
     public function index()
     {
         $products = Product::all();
         return view('products.index', compact('products'));
     }

     // Termék szerkesztés
     public function edit(Product $product)
     {
         return view('products.edit', compact('product'));
     }

     // Termék frissítése
     public function update(Request $request, Product $product)
     {
         $request->validate([
             'name' => 'required|max:255',
             'price' => 'required|numeric',
             'stock' => 'required|integer'
         ]);

         $product->update([
             'name' => $request->name,
             'price' => $request->price,
             'stock' => $request->stock,
         ]);

         return redirect()->route('products.index');
     }

     // Termék törlése
     public function destroy(Product $product)
     {
         $product->delete();
         return redirect()->route('products.index');
     }
}
