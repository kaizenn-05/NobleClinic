@extends('layouts.staff')

@section('title', 'Cashier Dashboard')

@section('sidebar')
    @include('partials.sidebars.cashier')
@endsection

@section('content')
    <h1 class="page-heading">Cashier Dashboard</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card welcome-card">
                <h2>Welcome, {{ auth()->user()->name }}!</h2>

                <p class="mb-0">
                    Manage patient arrivals, appointments, and payments.
                </p>
            </section>
        </div>

        @foreach ([
            ['label' => 'Patients Checked In', 'value' => '24'],
            ['label' => 'Appointments Today', 'value' => '32'],
            ['label' => 'Unpaid Invoices', 'value' => '6'],
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

        <div class="col-12 col-xl-8">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Recent Payments</h2>
                <p class="small text-secondary mb-4">
                    UI preview — fictional transactions
                </p>

                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Receipt</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Method</th>
                                <th scope="col" class="text-end">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>DEMO-001</td>
                                <td>Demo Patient One</td>
                                <td>Cash</td>
                                <td class="text-end">₱500.00</td>
                            </tr>
                            <tr>
                                <td>DEMO-002</td>
                                <td>Demo Patient Two</td>
                                <td>GCash</td>
                                <td class="text-end">₱750.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div class="col-12 col-xl-4">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Patient Queue</h2>
                <p class="small text-secondary mb-4">Sample data</p>

                <div class="d-flex justify-content-between border-bottom pb-3">
                    <span>Waiting for consultation</span>
                    <span class="badge text-bg-warning">4</span>
                </div>

                <div class="d-flex justify-content-between pt-3">
                    <span>Waiting for payment</span>
                    <span class="badge text-bg-info">2</span>
                </div>
            </section>
        </div>
    </div>
@endsection
