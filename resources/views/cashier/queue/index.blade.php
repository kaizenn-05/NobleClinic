@extends('layouts.staff')

@section('title', 'Patient Queue')

@section('sidebar')
    @include('partials.sidebars.cashier')
@endsection

@section('content')
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
            <h1 class="page-heading mb-1">Patient Queue</h1>
            <p class="text-secondary mb-0">
                Active visits, ordered by check-in time.
            </p>
        </div>

        <a href="{{ route('cashier.patients.index') }}"
           class="btn btn-clinic">
            + Patient Check-in
        </a>
    </div>

    <section class="clinic-card">
        <div class="users-toolbar mb-4">
            <div>
                <h2 class="h5 mb-1">Active Visits</h2>
                <small class="text-secondary">
                    {{ $visits->total() }} matching visits
                </small>
            </div>

            <form method="GET"
                  action="{{ route('cashier.queue.index') }}"
                  class="users-search"
                  role="search">
                <label for="queue-search" class="visually-hidden">
                    Search patient or doctor
                </label>

                <input type="search"
                       id="queue-search"
                       name="search"
                       class="form-control"
                       placeholder="Search patient or doctor…"
                       value="{{ request('search') }}"
                       maxlength="100">

                <button type="submit" class="btn btn-clinic">
                    Search
                </button>

                @if(request()->filled('search'))
                    <a href="{{ route('cashier.queue.index') }}"
                       class="btn btn-light">
                        Clear
                    </a>
                @endif
            </form>
        </div>

        @error('search')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <div class="table-responsive">
            <table class="table clinic-table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Checked In</th>
                        <th scope="col" class="text-center">Status</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($visits as $visit)
                        <tr>
                            <td>
                                <div class="fw-semibold">
                                    {{ $visit->patient->last_name }},
                                    {{ $visit->patient->first_name }}
                                    {{ $visit->patient->suffix }}
                                </div>

                                <small class="text-secondary">
                                    {{ $visit->patient->patient_number }}
                                </small>
                            </td>

                            <td>
                                {{ $visit->doctor?->name ?? 'Unassigned' }}
                            </td>

                            <td>
                                <div>
                                    {{ $visit->checked_in_at->copy()->timezone('Asia/Manila')->format('M d, Y') }}
                                </div>

                                <small class="text-secondary">
                                    {{ $visit->checked_in_at->copy()->timezone('Asia/Manila')->format('h:i A') }}
                                    PHT
                                </small>
                            </td>

                            <td class="text-center">
                                @if($visit->status === 'waiting')
                                    <span class="badge text-bg-warning">
                                        Waiting
                                    </span>
                                @else
                                    <span class="badge text-bg-info">
                                        In Consultation
                                    </span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-secondary">
                                No active visits found.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            {{ $visits->links() }}
        </div>

        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
            <small class="text-secondary">
                Loaded {{ now()->format('M d, Y h:i:s A') }}.
                Refresh to see changes.
            </small>

            <button type="button"
                    class="btn btn-sm btn-outline-primary"
                    onclick="window.location.reload()">
                Refresh Queue
            </button>
        </div>
    </section>
@endsection
