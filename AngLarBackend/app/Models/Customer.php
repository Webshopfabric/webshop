<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;
class Customer extends Authenticatable implements CanResetPassword
{
    use CanResetPasswordTrait,HasApiTokens, Notifiable;
    //use HasFactory;


    protected $table = 'customers'; // Használja a 'customers' táblát
    // Az oszlopok, amelyek tömeges hozzárendelésre kerülhetnek
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'address',
        'phone',
        'verification_token',
        
    ];

    //Ha van titkosított mező, például a jelszó, ezt is hozzáadhatjuk
    protected $hidden = [
        'password',
    ];

    // Ha a jelszó titkosítása szükséges, jelenleg a CustomerController-ben van, a register() metódusban
    // public function setPasswordAttribute($password)
    // {
    //     $this->attributes['password'] = bcrypt($password);
    // }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
