@extends('layouts.staff')

@section('title', 'Patient Dashboard')

@section('sidebar')
    @include('partials.sidebars.patient')
@endsection

@section('content')
    <h1 class="page-heading">Patient Dashboard</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card welcome-card">
                <h2>Welcome, {{ auth()->user()->name }}!</h2>
                <p class="mb-0">
                    Keep track of your appointments and clinic visits.
                </p>
            </section>
        </div>

        <div class="col-12">
            <p class="small text-secondary mb-0">
                Preview: appointment, visit, and billing details below
                are fictional sample data.
            </p>
        </div>

        @foreach ([
            ['label' => 'Upcoming Appointments', 'value' => '1'],
            ['label' => 'Completed Visits', 'value' => '4'],
            ['label' => 'Prescriptions Issued', 'value' => '3'],
            ['label' => 'Outstanding Balance', 'value' => '₱500'],
        ] as $stat)
            <div class="col-12 col-sm-6 col-xl-3">
                <section class="clinic-card">
                    <div class="stat-label">{{ $stat['label'] }}</div>
                    <div class="stat-value">{{ $stat['value'] }}</div>
                    <div class="stat-note">Sample data</div>
                </section>
            </div>
        @endforeach

        <div class="col-12 col-lg-7">
            <section class="clinic-card">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="h5 mb-0">Next Appointment</h2>
                    <span class="badge text-bg-info">Scheduled</span>
                </div>

                <dl class="row mb-0">
                    <dt class="col-sm-4">Date</dt>
                    <dd class="col-sm-8">October 20, 2026</dd>

                    <dt class="col-sm-4">Time</dt>
                    <dd class="col-sm-8">9:00 AM</dd>

                    <dt class="col-sm-4">Doctor</dt>
                    <dd class="col-sm-8">Demo Doctor</dd>

                    <dt class="col-sm-4">Reason</dt>
                    <dd class="col-sm-8">Follow-up consultation</dd>
                </dl>
            </section>
        </div>

        <div class="col-12 col-lg-5">
            <section class="clinic-card">
                <h2 class="h5 mb-4">My Account</h2>

                <dl class="mb-0">
                    <dt>Name</dt>
                    <dd>{{ auth()->user()->name }}</dd>

                    <dt>Email</dt>
                    <dd class="text-break">{{ auth()->user()->email }}</dd>

                    <dt>Patient Number</dt>
                    <dd class="mb-0 text-secondary">
                        Not connected yet
                    </dd>
                </dl>
            </section>
        </div>

        <div class="col-12">
            <section class="clinic-card">
                <h2 class="h5 mb-4">Recent Visits</h2>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Visit Type</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>October 10, 2026</td>
                                <td>Demo Doctor</td>
                                <td>General consultation</td>
                                <td>
                                    <span class="badge text-bg-success">
                                        Completed
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>September 25, 2026</td>
                                <td>Demo Doctor</td>
                                <td>Follow-up</td>
                                <td>
                                    <span class="badge text-bg-success">
                                        Completed
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
