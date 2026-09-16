<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MedicineController;
use Illuminate\Support\Facades\Route;
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('api.token')->group(function () { Route::post('/logout', [AuthController::class, 'logout']); Route::apiResource('medicines', MedicineController::class); });