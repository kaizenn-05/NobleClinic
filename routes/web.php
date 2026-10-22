<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Cashier\PatientController;
use App\Http\Controllers\Cashier\QueueController;
use App\Http\Controllers\Cashier\AppointmentController;
use App\Http\Controllers\Doctor\ConsultationController;

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
    Route::view('/dashboard', 'admin.dashboard')->name('dashboard');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');

        Route::post('/users', [UserController::class, 'store'])
            ->name('users.store');

        Route::patch('/users/{user}', [UserController::class, 'update'])
            ->name('users.update');

        Route::delete('/users/{user}', [UserController::class, 'destroy'])
            ->name('users.destroy');
    });

// Doctor pages.
Route::middleware(['auth', 'verified', 'role:doctor'])
    ->prefix('doctor')
    ->name('doctor.')
    ->group(function () {
        Route::view('/dashboard', 'doctor.dashboard')
            ->name('dashboard');
        Route::get('/queue', [ConsultationController::class, 'index'])
            ->name('queue.index');

        Route::post('/visits/{visit}/start', [ConsultationController::class, 'start'])
            ->name('visits.start');

        Route::patch('/visits/{visit}/consultation', [ConsultationController::class, 'save'])
            ->name('visits.consultation.save');
    });

// Cashier pages.
Route::middleware(['auth', 'verified', 'role:cashier'])
    ->prefix('cashier')
    ->name('cashier.')
    ->group(function () {
        Route::view('/dashboard', 'cashier.dashboard')->name('dashboard');
        Route::resource('/patients', PatientController::class);
        Route::get('/patients', [PatientController::class, 'index'])->name('patients.index');
        Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
        Route::post('/patients/{patient}/check-in', [PatientController::class, 'checkIn'])->name('patients.check-in');
        Route::get('/patients/{patient}', [PatientController::class, 'show'])
            ->name('patients.show');

        Route::get('/patients/{patient}/print', [PatientController::class, 'printRecord'])
            ->name('patients.print');

        Route::get('/queue', [QueueController::class, 'index'])
            ->name('queue.index');

        Route::get('/appointments', [AppointmentController::class, 'index'])
            ->name('appointments.index');

        Route::post('/appointments', [AppointmentController::class, 'store'])
            ->name('appointments.store');

        Route::post('/appointments/{appointment}/cancel', [AppointmentController::class,'cancel', ])
            ->name('appointments.cancel');

        Route::post('/appointments/{appointment}/check-in', [ AppointmentController::class,'checkIn',])
            ->name('appointments.check-in');

        Route::patch('/appointments/{appointment}', [AppointmentController::class,'update',
            ])->name('appointments.update');

        Route::get('/patients/{patient}/pdf', [PatientController::class,'downloadPdf',])
            ->name('patients.pdf');
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
