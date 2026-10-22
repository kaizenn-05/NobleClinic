<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
        ]);

        $search = trim((string) $request->input('search', ''));

        $users = User::with('role')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhereHas('role', function ($roleQuery) use ($search) {
                            $roleQuery->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return view('admin.users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'lowercase', 'email',
                'max:255', Rule::unique('users', 'email'),
            ],
            'role' => [
                'required',
                Rule::in(['doctor', 'cashier', 'pharmacist']),
            ],
            'password' => [
                'required', 'confirmed', Password::defaults(),
            ],
        ]);

        if ($validator->fails()) {
            return to_route('admin.users.index')
                ->withErrors($validator)
                ->withInput($request->only('name', 'email', 'role'))
                ->with('modal', 'add-staff-modal');
        }

        $data = $validator->validated();
        $role = Role::where('name', $data['role'])->firstOrFail();

        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->role_id = $role->id;
        $user->is_active = true;
        $user->save();

        return to_route('admin.users.index')
            ->with('success', 'Staff account created successfully.');
    }

    public function update(Request $request, User $user)
    {
        if (
            $user->id === $request->user()->id ||
            $user->role?->name === 'admin'
        ) {
            return to_route('admin.users.index')
                ->with('error', 'Use My Profile for your own account. Admin accounts are protected here.');
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'lowercase', 'email', 'max:255',
                Rule::unique('users', 'email')->ignore($user),
            ],
            'role' => [
                'required',
                Rule::in(['doctor', 'cashier', 'pharmacist', 'patient']),
            ],
        ]);

        if ($validator->fails()) {
            return to_route('admin.users.index')
                ->withErrors($validator)
                ->withInput($request->only('name', 'email', 'role'))
                ->with('modal', 'edit-user-modal')
                ->with('edit_url', route('admin.users.update', $user));
        }

        $data = $validator->validated();
        $role = Role::where('name', $data['role'])->firstOrFail();

        if ($user->email !== $data['email']) {
            $user->email_verified_at = null;
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->role_id = $role->id;
        $user->save();

        return to_route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(Request $request, User $user)
    {
        if (
            $user->id === $request->user()->id ||
            $user->role?->name === 'admin'
        ) {
            return to_route('admin.users.index')
                ->with('error', 'Your account and admin accounts cannot be deleted here.');
        }

        try {
            $user->delete();
        } catch (QueryException $exception) {
            // MySQL: deletion blocked by a foreign key.
            if ((int) ($exception->errorInfo[1] ?? 0) === 1451) {
                return to_route('admin.users.index')
                    ->with('error', 'This account has linked records and cannot be deleted.');
            }

            throw $exception;
        }

        return to_route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
