<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Security;
use Illuminate\Http\JsonResponse;

class MarketDataController extends Controller
{
    public function index(): JsonResponse
    {
        // Traemos las acciones con su último precio y tipo
        // Asumimos que tienes las relaciones definidas en los modelos
        $securities = Security::with(['lastPrice', 'securityType'])->get();

        $data = $securities->map(function ($security) {
            return [
                'symbol' => $security->symbol,
                'price' => (float) $security->lastPrice?->last_price,
                'currency' => $security->lastPrice?->currency ?? 'USD',
                'type' => $security->securityType?->slug,
                // Lógica simple para determinar el "Adapter" basado en el tipo
                'source_adapter' => $security->securityType?->slug === 'crypto' ? 'CoinGeckoAdapter' : 'FrankfurterAdapter',
                'updated_at' => $security->lastPrice?->created_at->diffForHumans(),
                // Si el dato tiene más de 1 hora, es "stale" (viejo)
                'is_stale' => $security->lastPrice?->created_at->lt(now()->subHour())
            ];
        });

        return response()->json($data)
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Cache-Control', 'post-check=0, pre-check=0')
            ->header('Pragma', 'no-cache');
    }
}