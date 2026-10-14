@extends('layouts.staff')

@section('title', 'Doctor Dashboard')

@section('sidebar')
    @include('partials.sidebars.doctor')
@endsection

@section('content')
    <h1 class="page-heading">Doctor Dashboard</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card welcome-card">
                <h2>Welcome, {{ auth()->user()->name }}!</h2>
                <p class="mb-0">
                    View your schedule and manage patient consultations.
                </p>
            </section>
        </div>

        @foreach ([
            ['label' => 'Appointments Today', 'value' => '12'],
            ['label' => 'Waiting Patients', 'value' => '4'],
            ['label' => 'Completed Consultations', 'value' => '8'],
            ['label' => 'Follow-ups Today', 'value' => '3'],
        ] as $stat)
            <div class="col-12 col-sm-6 col-xl-3">
                <section class="clinic-card">
                    <div class="stat-label">{{ $stat['label'] }}</div>
                    <div class="stat-value">{{ $stat['value'] }}</div>
                    <div class="stat-note">Sample data</div>
                </section>
            </div>
        @endforeach

        <div class="col-12">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Today's Appointments</h2>
                <p class="text-secondary small mb-4">
                    UI preview — fictional patient records
                </p>

                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Patient Number</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Time</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>00-00-00-01</td>
                                <td>Demo Patient One</td>
                                <td>9:00 AM</td>
                                <td>General consultation</td>
                                <td>
                                    <span class="badge text-bg-warning">
                                        Waiting
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>00-00-00-02</td>
                                <td>Demo Patient Two</td>
                                <td>9:30 AM</td>
                                <td>Follow-up</td>
                                <td>
                                    <span class="badge text-bg-info">
                                        Scheduled
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
@endsection
