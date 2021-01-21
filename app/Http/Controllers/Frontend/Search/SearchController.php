<?php

namespace App\Http\Controllers\Frontend\Search;

use App\Http\Controllers\Controller;
use App\Models\Management\Agency;
use App\Models\Management\Document;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function show(Request $request)
    {

        if (!$request->reference) {
            // return  redirect()->route('frontend.index');
            return response()->json(['message' => 'Documento não encontrado.'], 404);
        }

        $reference = $request->reference;
        $document = Document::where('reference', $reference)->firstOrFail();
        $agency = Agency::where('id', $document->agency_id)->firstOrFail();


        return response()->json(['document' => [
            'reference' => $document->reference,
            'owner' => $document->owner,
            'type' => $document->type,
            'emmitted_at' => $document->date_emission,
            'created_at' => $document->created_at,
            'recovered_at' => $document->recovered_at,
            'commentary' => $document->commentary,
            'agency' => [
                'name' => $agency->name,
                'phone' => '+244 925 532 654',
                'address' => $agency->address,
                'province' => $agency->province,
            ],
        ]], 200);
    }

}
