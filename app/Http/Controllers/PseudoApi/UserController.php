<?php

namespace App\Http\Controllers\PseudoApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Auth\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     *
     * Return the authenticated user
     */
    public function me()
    {
        return new UserResource(Auth::user());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();

        if (!$authUser->hasRole('diretor')) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $input = $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'bi' => 'required|max:255',
            'password' => 'required|confirmed',
            'province' => 'required|max:255',
            'email' => 'required|max:255|unique:users,email',
            'phone_number' => 'required'
        ]);

        $input['confirmation_code'] = md5(uniqid(mt_rand(), true));
        $input['confirmed'] = true;
        $input['agency_id'] = auth()->user()->agency->id;

        $user = User::create($input);

        $user->assignRole('operador');

        return response()->json(['message' => 'Usuario criado com sucesso.'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User     $user
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $authUser = Auth::user();

        if (
            !$authUser->hasRole('admininstrador') &&
            !$authUser->is($user) &&
            !$authUser->is($user->agency->director)
        ) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }


        $input = $request->validate([
            'first_name' => 'max:255',
            'last_name' => 'max:255',
            'phone_number' => 'max:255',
            'bi' => 'max:255',
            'province' => 'max:255',
            'email' => 'max:255|unique:users,email,' . $user->id
        ]);

        if (isset($request->password)) {
            $input['password'] = $request->validate(['password' => 'confirmed']);
        }

        $user->update($input);

        return response()->json(['message' => 'Usuario actualizado com sucesso.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $authUser = Auth::user();

        if ($authUser->hasRole('operador') || $user->id == 1 && $authUser->id != 1) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario deletado com sucesso.'], 200);
    }

    /**
     * Find a user by bi
     *
     * @param string $bi
     *
     *
     * @return \Illuminate\Http\Response
     */
    public function userByBi($bi)
    {
        $authUser = Auth::user();

        if ($authUser->hasRole('operador')) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $user = User::where('bi', '=', $bi)->firstOrFail();

        return new UserResource($user);
    }

    public function verifyData(Request $request)
    {
        $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'bi' => 'required|max:255',
            'password' => 'required|confirmed',
            'province' => 'required|max:255',
            'email' => 'required|max:255|unique:users,email',
            'telephone' => 'required'
        ]);

        return response()->json(['message' => 'Dados conforme'], 200);
    }
}
