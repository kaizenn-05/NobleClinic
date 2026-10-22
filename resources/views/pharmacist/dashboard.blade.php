@extends('layouts.staff')

@section('title', 'Pharmacist Dashboard')

@section('sidebar')
    @include('partials.sidebars.pharmacist')
@endsection

@section('content')
    <h1 class="page-heading">Pharmacist Dashboard</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card welcome-card">
                <h2>Welcome, {{ auth()->user()->name }}!</h2>
                <p class="mb-0">
                    Manage medicine inventory and prescription dispensing.
                </p>
            </section>
        </div>

        <div class="col-12">
            <p class="small text-secondary mb-0">
                UI preview — all inventory and dispensing figures below
                are sample data.
            </p>
        </div>

        @foreach ([
            ['label' => 'Active Medicine Types', 'value' => '156'],
            ['label' => 'Pending Prescriptions', 'value' => '8'],
            ['label' => 'Low-stock Medicines', 'value' => '5'],
            ['label' => 'Batches Expiring in 30 Days', 'value' => '3'],
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
                <h2 class="h5 mb-4">Inventory Attention List</h2>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Medicine</th>
                                <th scope="col">Batch</th>
                                <th scope="col">Available</th>
                                <th scope="col">Alert</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Demo Medicine A</td>
                                <td>DEMO-B001</td>
                                <td>12 tablets</td>
                                <td>
                                    <span class="badge text-bg-warning">
                                        Low stock
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Demo Medicine B</td>
                                <td>DEMO-B002</td>
                                <td>40 capsules</td>
                                <td>
                                    <span class="badge text-bg-danger">
                                        Near expiry
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div class="col-12 col-xl-4">
            <section class="clinic-card">
                <h2 class="h5 mb-4">Dispensing Overview</h2>

                <div class="d-flex justify-content-between border-bottom pb-3">
                    <span>Prescriptions completed today</span>
                    <span class="badge text-bg-success">14</span>
                </div>

                <div class="d-flex justify-content-between pt-3">
                    <span>Prescriptions awaiting dispensing</span>
                    <span class="badge text-bg-warning">8</span>
                </div>
            </section>
        </div>
    </div>
@endsection
