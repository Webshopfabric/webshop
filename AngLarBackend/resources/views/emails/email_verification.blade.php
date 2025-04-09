<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <h1>Kedves {{ $customer->name }}!</h1>
    <p>Köszönjük, hogy regisztráltál. Kérjük, erősítsd meg az email címedet az alábbi linkre kattintva:</p>
    <a href="{{ url('/api/verify-email?token=' . $token) }}">Email cím megerősítése</a>
</body>
</html>