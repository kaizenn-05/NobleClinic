<x-layouts.auth>

    <!-- Logo -->
    <a href="index.html" class="app-brand auth-cover-brand gap-2">
        <span class="app-brand-logo demo">
            <span class="text-primary">
                <img src="{{ $school && $school->logo ? Storage::url($school->logo) : asset('assets/img/logo/pac-logo.png') }}"
                    alt="PAC Logo" />
            </span>
        </span>
        <span class="app-brand-text demo text-heading fw-bold">PAC-AIMS</span>
    </a>
    <!-- /Logo -->
    <div class="authentication-inner row m-0">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div class="w-100 d-flex justify-content-center">
                <img src="{{ asset('assets/img/illustrations/boy-with-rocket-light.png') }}" class="img-fluid"
                    alt="Login image" width="700" data-app-dark-img="illustrations/boy-with-rocket-dark.png"
                    data-app-light-img="illustrations/boy-with-rocket-light.png" />
            </div>
        </div>
        <!-- /Left Text -->

        <!-- Login -->
        <div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-12 p-6">
            <div class="w-px-400 mx-auto mt-sm-12 mt-8">
                <h4 class="mb-1">Welcome to PAC-AIMS! 👋</h4>
                <p class="mb-6">Welcome back! Sign in to access your portal</p>

                <form id="formAuthentication" class="mb-6" method="POST" action="{{ url('/login') }}">
                    @csrf
                    <div class="mb-6 form-control-validation">
                        <label for="username" class="form-label">Username</label>

                        <input type="text" class="form-control @error('username') is-invalid @enderror"
                            id="username" name="username" placeholder="Enter your username"
                            value="{{ old('username') }}" autofocus />
                    </div>

                    <div class="form-password-toggle form-control-validation">
                        <label class="form-label" for="password">Password</label>
                        <div class="input-group input-group-merge">
                            <input type="password" id="password" class="form-control" name="password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                aria-describedby="password" />
                            <span class="input-group-text cursor-pointer"><i class="icon-base bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div class="my-7">
                        <div class="d-flex justify-content-between">
                            <div class="form-check mb-0">
                                <input class="form-check-input" type="checkbox" id="remember-me" />
                                <label class="form-check-label" for="remember-me">Remember Me</label>
                            </div>
                            <a href="auth-forgot-password-cover.html">
                                <p class="mb-0">Forgot Password?</p>
                            </a>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary d-flex w-100">Sign in</button>
                </form>

                <p class="text-center">
                    <span>New on our platform?</span>
                    <a href="{{ route('online-admission.application-process') }}">
                        <span>Create an account</span>
                    </a>
                </p>

                <!-- Data Privacy Notice -->
                <div class="mt-4 p-3 rounded-3"
                    style="background-color: rgba(105, 108, 255, 0.08); border: 1px solid rgba(105, 108, 255, 0.15);">

                    <div class="d-flex align-items-start gap-2">
                        <i class="bx bx-shield-quarter text-primary" style="font-size: 18px;"></i>

                        <div>
                            <small class="fw-semibold text-dark d-block mb-1">
                                Data Privacy Notice
                            </small>

                            <small class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">
                                The processing of personal information shall be allowed, subject to compliance
                                with the requirements of Republic Act 10173 (Data Privacy Act of 2012) and other
                                applicable laws, ensuring transparency, legitimate purpose, and proportionality.
                            </small>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- /Login -->
    </div>
</x-layouts.auth>
