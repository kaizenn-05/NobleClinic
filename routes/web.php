<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::view('/', 'welcome');

// Landing page after login: redirect according to role.
Route::get('/dashboard', function (Request $request) {
    $user = $request->user();

    abort_unless($user->is_active, 403, 'Account is inactive.');

    $dashboard = match ($user->role?->name) {
        'admin' => 'admin.dashboard',
        'doctor' => 'doctor.dashboard',
        'cashier' => 'cashier.dashboard',
        'pharmacist' => 'pharmacist.dashboard',
        'patient' => 'patient.dashboard',
        default => null,
    };

    abort_unless($dashboard, 403, 'No valid role assigned.');

    return redirect()->route($dashboard);
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin pages.
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::view('/dashboard', 'admin.dashboard')
            ->name('dashboard');
    });

// Doctor pages.
Route::middleware(['auth', 'verified', 'role:doctor'])
    ->prefix('doctor')
    ->name('doctor.')
    ->group(function () {
        Route::view('/dashboard', 'doctor.dashboard')
            ->name('dashboard');
    });

// Cashier pages.
Route::middleware(['auth', 'verified', 'role:cashier'])
    ->prefix('cashier')
    ->name('cashier.')
    ->group(function () {
        Route::view('/dashboard', 'cashier.dashboard')
            ->name('dashboard');
    });

// Pharmacist pages.
Route::middleware(['auth', 'verified', 'role:pharmacist'])
    ->prefix('pharmacist')
    ->name('pharmacist.')
    ->group(function () {
        Route::view('/dashboard', 'pharmacist.dashboard')
            ->name('dashboard');
    });

// Patient pages.
Route::middleware(['auth', 'verified', 'role:patient'])
    ->prefix('patient')
    ->name('patient.')
    ->group(function () {
        Route::view('/dashboard', 'patient.dashboard')
            ->name('dashboard');
    });

// Shared account profile: only active users with valid roles.
Route::middleware([
    'auth',
    'role:admin,doctor,cashier,pharmacist,patient',
])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
