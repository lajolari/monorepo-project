<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Security;
use Illuminate\Http\JsonResponse;

class MarketDataController extends Controller
{
    public function index(): JsonResponse
    {

        $securities = Security::with(['latestPrice', 'type'])->get();

        $data = $securities->map(function ($security) {
            return [
                'id' => $security->id,
                'symbol' => $security->symbol,
                'name' => $security->name,
                'category' => $security->type ? $security->type->slug : 'unknown',
                
                'price' => $security->latestPrice ? (float)$security->latestPrice->last_price : 0,
                'currency' => 'USD', 
                'last_updated' => $security->latestPrice ? $security->latestPrice->as_of_date : null,
            ];
        });

        return response()->json($data);
    }
}