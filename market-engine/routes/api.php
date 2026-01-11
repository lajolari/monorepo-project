<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SecurityPriceController;
use App\Http\Controllers\Api\MarketDataController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/securities/sync', [SecurityPriceController::class, 'sync']);


Route::get('/market-data', [MarketDataController::class, 'index']);