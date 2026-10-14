<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Patient Dashboard</title>
</head>
<body>
    <h1>Welcome, {{ auth()->user()->name }}!</h1>
    <p>You are signed in as a patient.</p>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit">Logout</button>
    </form>
</body>
</html>
