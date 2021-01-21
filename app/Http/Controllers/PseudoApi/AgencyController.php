<?php

namespace App\Http\Controllers\PseudoApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\Agency as AgencyResource;
use App\Http\Resources\Document as DocumentResource;
use App\Http\Resources\UserResource;
use App\Models\Auth\User;
use App\Models\Management\Agency;
use Auth;
use Exception;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
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

        if (!$authUser->hasRole('administrator')) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $input = $request->validate([
            'director' => 'present|array',
            'director.first_name' => 'required|max:255',
            'director.last_name' => 'required|max:255',
            'director.bi' => 'required|max:255',
            'director.password' => 'required|confirmed',
            'director.province' => 'required|max:255',
            'director.email' => 'required|max:255|unique:users,email',
            'director.telephone' => 'required'
        ]);

        $input['director']['agency_id'] = 1;

        $director = User::create($input['director']);
        $director->assignRole('director');

        $input = $request->validate([
            'agency' => 'present|array',
            'agency.name' => 'required|max:255',
            'agency.address' => 'required|max:255',
            'agency.province' => 'required|max:255'
        ]);

        $input['agency']['user_id'] = $director->id;

        $agency = Agency::create($input['agency']);

        $director->update(['agency_id' => $agency->id]);

        return response()->json(['director' => $director, 'agency' => $agency], 200);

        return new AgencyResource($agency);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Agency     $agency
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Agency $agency)
    {
        $authUser = Auth::user();

        if (!$authUser->hasRole('administrator') && !$authUser->is($agency->director)) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $request->validate([
            'name' => 'max:255',
            'address' => 'max:255'
        ]);

        $agency->update($request->only([
            'name',
            'address',
            'user_id',
            'province'
        ]));

        return response()->json(['message' => 'Agência atualizada com sucesso.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Agency  $agency
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Agency $agency)
    {
        $authUser = Auth::user();

        if (!$authUser->hasRole('administrator')) {
            return response()->json(['message' => 'Não autorizado'], 401);
        }

        $agency->delete();

        return response()->json(['message' => 'Agência deletada com sucesso.'], 200);
    }

    /**
     * Display a listing of documents in the user agency.
     *
     * @return \Illuminate\Http\Response
     */
    public function documents(Request $request)
    {
        $agency = $request->user()->agency->id;

        $documents = Agency::find($agency)->documents()->orderBy('id')->get();

        return DocumentResource::collection($documents);
    }

    /**
     * Display a listing of users in the user agency.
     *
     * @return \Illuminate\Http\Response
     */
    public function users($agency)
    {

        $users = User::where('agency_id', '=', $agency)->orderBy('id', 'desc')->get();

        return UserResource::collection($users);
    }
}
