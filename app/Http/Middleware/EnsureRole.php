<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(
        Request $request,
        Closure $next,
        string ...$roles
    ): Response {
        $user = $request->user();

        abort_unless($user, 401);

        abort_unless(
            $user->is_active &&
            in_array($user->role?->name, $roles, true),
            403,
            'You are not allowed to access this page.'
        );

        return $next($request);
    }
}
