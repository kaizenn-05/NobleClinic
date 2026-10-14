@extends('layouts.staff')

@section('title', 'Admin Dashboard')

@section('sidebar')
    @include('partials.sidebars.admin')
@endsection

@section('content')
    <h1 class="page-heading">Admin Dashboard</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card welcome-card">
                <h2>Welcome, {{ auth()->user()->name }}!</h2>

                <p class="mb-0">
                    Monitor clinic activity, accounts, inventory, and billing.
                </p>
            </section>
        </div>

        @foreach ([
            ['label' => 'Total Patients', 'value' => '1,248'],
            ['label' => 'Appointments Today', 'value' => '32'],
            ['label' => 'Active Staff', 'value' => '14'],
            ['label' => 'Collections Today', 'value' => '₱8,450'],
        ] as $stat)
            <div class="col-12 col-sm-6 col-xl-3">
                <section class="clinic-card">
                    <div class="stat-label">{{ $stat['label'] }}</div>
                    <div class="stat-value">{{ $stat['value'] }}</div>
                    <div class="stat-note">Sample data</div>
                </section>
            </div>
        @endforeach

        <div class="col-12 col-lg-8">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Recent Clinic Activity</h2>
                <p class="small text-secondary mb-4">
                    UI preview — fictional activity
                </p>

                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">Activity</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>9:00 AM</td>
                                <td>New patient registered</td>
                                <td>Cashier</td>
                            </tr>
                            <tr>
                                <td>9:15 AM</td>
                                <td>Consultation completed</td>
                                <td>Doctor</td>
                            </tr>
                            <tr>
                                <td>9:30 AM</td>
                                <td>Prescription dispensed</td>
                                <td>Pharmacy</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div class="col-12 col-lg-4">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Inventory Alerts</h2>
                <p class="small text-secondary mb-4">Sample data</p>

                <div class="d-flex justify-content-between border-bottom pb-3">
                    <span>Low-stock medicines</span>
                    <span class="badge text-bg-warning">5</span>
                </div>

                <div class="d-flex justify-content-between pt-3">
                    <span>Batches expiring within 30 days</span>
                    <span class="badge text-bg-danger">3</span>
                </div>
            </section>
        </div>
    </div>
@endsection
