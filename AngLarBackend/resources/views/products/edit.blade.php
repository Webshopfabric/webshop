<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
</head>
<body>
    <h1>Edit Product</h1>
    <form action="{{ route('products.update', $product->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Product Name:</label>
        <input type="text" id="name" name="name" value="{{ old('name', $product->name) }}" required>
        @error('name')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br>

        <label for="price">Price:</label>
        <input type="text" id="price" name="price" value="{{ old('price', $product->price) }}" required>
        @error('price')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br>

        <label for="stock">Stock:</label>
        <input type="text" id="stock" name="stock" value="{{ old('stock', $product->stock) }}" required>
        @error('stock')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br><br>
        <button type="submit">Update Product</button>
    </form>
    <a href="{{ route('products.index') }}">Back to List</a>
</body>
</html>
