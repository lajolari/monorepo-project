<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Security extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Relación con todos los precios (Historial)
    public function prices()
    {
        return $this->hasMany(SecurityPrice::class);
    }

    // Relación INTELIGENTE para obtener solo el precio más reciente
    // (Usa 'latestOfMany' para ser ultra eficiente)
    public function latestPrice()
    {
        return $this->hasOne(SecurityPrice::class)->latestOfMany();
    }
    
    // Relación con el tipo (Stock vs Crypto)
    public function type()
    {
        return $this->belongsTo(SecurityType::class, 'security_type_id');
    }
}