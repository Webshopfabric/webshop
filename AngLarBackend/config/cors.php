<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */


    'allowed_origins' => ['*'], // Minden domain engedélyezése
    // 'allowed_origins' => ['http://localhost:4200'], // Engedélyezed az Angular app domainjét
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Engedélyezett útvonalak
    'allowed_methods' => ['*'], // Engedélyezett HTTP metódusok
    'allowed_origins_patterns' => [], // Engedélyezett eredet minták
    'allowed_headers' => ['*'], // Engedélyezett fejlécek
    'exposed_headers' => [], // Kitetett fejlécek
    'max_age' => 0, // Maximális életkor
    'supports_credentials' => false, // Támogatja a hitelesítő adatokat
];
