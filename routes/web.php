<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapaktiDataController;

// Halaman utama (SPA React) dengan inject data database terkini
Route::get('/', [MapaktiDataController::class, 'welcome']);

// API endpoint untuk persistensi data lintas-browser
Route::prefix('api')->group(function () {
    Route::get('/data',  [MapaktiDataController::class, 'index']);
    Route::post('/data', [MapaktiDataController::class, 'store']);
});
