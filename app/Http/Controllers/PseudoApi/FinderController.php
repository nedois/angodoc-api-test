<?php

namespace App\Http\Controllers\PseudoApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\Finder as FinderResource;
use App\Http\Resources\Document as DocumentResource;
use App\Models\Management\Finder;
use Illuminate\Http\Request;

class FinderController extends Controller
{
    protected $provinces, $jobs;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->provinces = 'Bengo,Benguela,Bié,Cabinda,Cuando-Cubango,Cuanza Norte,Cuanza Sul,Cunene,Huambo,Huíla,Luanda,Lunda Norte,Lunda Sul,Malanje,Moxico,Namibe,Uíge,Zaire';
        $this->jobs = 'trabalhador,estudante,desempregado';
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
        $input = $request->validate([
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'age' => 'required|numeric|min:16|max:100',
            'job' => 'required|in:' . $this->jobs,
            'address' => 'string|min:6',
            'bi' => 'required|string|min:6|max:255|unique:finders,bi',
            'gender' => 'required|in:M,F',
            'province' => 'required|string|in:' . $this->provinces,
            'phone_number' => 'required|string|min:6|max:255'
        ]);

        $input['user_id'] = auth()->user()->id;
        $input['agency_id'] = auth()->user()->agency->id;

        $finder = Finder::create($input);

        return new FinderResource($finder);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Finder     $finder
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Finder $finder)
    {
        $input = $request->validate([
            'first_name' => 'string|min:2|max:255',
            'last_name' => 'string|min:2|max:255',
            'age' => 'numeric|min:16|max:100',
            'job' => 'in:' . $this->jobs,
            'address' => 'string|min:6',
            'bi' => 'string|min:6|max:255|unique:finders,bi,' . $finder->id,
            'gender' => 'in:M,F',
            'province' => 'string|in:' . $this->provinces,
            'phone_number' => 'string|min:6|max:255'
        ]);

        $finder->update($input);

        return new FinderResource($finder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Finder  $finder
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Finder $finder)
    {
        $finder->delete();

        return response()->json(['message' => 'Encontrador deletado com sucesso.'], 200);
    }
}
