<?php

namespace App\Http\Controllers\PseudoApi;

use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Management\Document;
use App\Http\Controllers\Controller;
use App\Http\Resources\Document as DocumentResource;

class DocumentController extends Controller
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

        $input = $request->validate([
            'reference' => 'required|max:255|unique:documents,reference',
            'finder_id' => 'required|min:1',
            'owner' => 'required|max:255',
            'type' => 'required|max:255',
            'date_emission' => 'required|max:255',
            'commentary' => 'max:255'
        ]);

        $input['agency_id'] = $request->user()->agency->id;
        $input['user_id'] = $request->user()->id;
        $input['date_emission'] = Carbon::parse($input['date_emission']);

        Document::create($input);

        return response()->json(['message' => 'Documento criado com sucesso.'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Document     $document
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Document $document)
    {
        $input = $request->validate([
            'reference' => 'max:255|unique:documents,reference,' . $document->id,
            'owner' => 'max:255',
            'type' => 'max:255',
            'date_emission' => 'max:255',
            'commentary' => 'max:255'
        ]);

        $input['date_emission'] = Carbon::parse($input['date_emission']);

        $document->update($input);

        return response()->json(['message' => 'Documento actualizado com sucesso.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Document  $document
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        $document->delete();

        return response()->json(['message' => 'Documento deletado com sucesso.'], 200);
    }

    /**
     * Mark the specified resource has recovered.
     *
     * @param  Document  $document
     *
     * @return \Illuminate\Http\Response
     */
    public function recovered(Document $document)
    {
        $document->recovered_at = now();

        $document->save();

        return response()->json(['message' => 'Documento marcado como recuperado.'], 200);
    }

    /**
     * Mark the specified resource has unrecovered.
     *
     * @param  Document  $document
     *
     * @return \Illuminate\Http\Response
     */
    public function unrecovered(Document $document)
    {
        $document->recovered_at = null;

        $document->save();

        return response()->json(['message' => 'Documento marcado como recuperado.'], 200);
    }
}
