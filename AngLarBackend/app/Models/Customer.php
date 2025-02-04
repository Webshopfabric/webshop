<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
class Customer extends Model
{
    use HasFactory;

    // Az oszlopok, amelyek tömeges hozzárendelésre kerülhetnek
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'address',
        'phone'
    ];

    // Ha van titkosított mező, például a jelszó, ezt is hozzáadhatjuk
    protected $hidden = [
        'password',
    ];

    // Ha a jelszó titkosítása szükséges
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }
}
