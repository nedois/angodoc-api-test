<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Management\Agency;
use Illuminate\Http\Request;

class AgenciesController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $agencies = Agency::where('province', $request->province)->orderBy('name')->get();

        $cleanAgencies = array();

        foreach ($agencies as $agency) {
            array_push($cleanAgencies, [
                'name' => $agency->name,
                'phone' => '+244 925 532 654',
                'address' => $agency->address,
                'province' => $agency->province,
            ]);
        }

        return response()->json(['agencies' => $cleanAgencies], 200);
    }
}
