<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Visit;
use Illuminate\Http\Request;

class QueueController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
        ]);

        $search = trim((string) $request->input('search', ''));

        $visits = Visit::query()
            ->with(['patient', 'doctor'])
            ->whereIn('status', ['waiting', 'in_consultation'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('patient', function ($patientQuery) use ($search) {
                        $patientQuery
                            ->where('patient_number', 'like', "%{$search}%")
                            ->orWhere('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhereRaw(
                                "CONCAT(first_name, ' ', last_name) LIKE ?",
                                ["%{$search}%"]
                            );
                    })
                    ->orWhereHas('doctor', function ($doctorQuery) use ($search) {
                        $doctorQuery->where('name', 'like', "%{$search}%");
                    });
                });
            })
            ->orderBy('checked_in_at')
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString();

        return view('cashier.queue.index', compact('visits'));
    }
}
