
<!DOCTYPE html>
<html>
<head>
    <title>Jelszó visszaállítása</title>
</head>
<body>
    <h1>Kedves {{ $customer->name }}!</h1>
    <p>Kattints az alábbi linkre a jelszó visszaállításához:</p>
    <a href="{{ config('app.frontend_url') . '/#/reset-password/' . $token }}">Jelszó visszaállítása</a>
    <p>Ha nem te kérted a jelszó visszaállítását, hagyd figyelmen kívül ezt az üzenetet.</p>
</body>
</html>