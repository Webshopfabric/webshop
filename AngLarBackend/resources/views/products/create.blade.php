<!-- resources/views/products/create.blade.php -->

{{-- @extends('layouts.app')

@section('content')
    <h1>Add a New Product</h1>
    <form action="{{ route('products.store') }}" method="POST">
        @csrf
        <label for="name">Product Name:</label>
        <input type="text" id="name" name="name">

        <label for="price">Price:</label>
        <input type="number" step="0.01" id="price" name="price">

        <label for="stock">Stock:</label>
        <input type="number" id="stock" name="stock">

        <button type="submit">Save Product</button>
    </form>
@endsection --}}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Product</title>
</head>
<body>
    <h1>Create New Product</h1>
    <form action="{{ route('products.store') }}" method="POST">
        @csrf
        <label for="name">Product Name:</label>
        <input type="text" id="name" name="name" value="{{ old('name') }}" required>
        @error('name')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br>

        <label for="price">Price:</label>
        <input type="text" id="price" name="price" value="{{ old('price') }}" required>
        @error('price')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br>

        <label for="stock">Stock:</label>
        <input type="text" id="stock" name="stock" value="{{ old('stock') }}" required>
        @error('stock')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        <br><br>
        <button type="submit">Save Product</button>
    </form>
    <a href="{{ route('products.index') }}">Back to List</a>
</body>
</html>

