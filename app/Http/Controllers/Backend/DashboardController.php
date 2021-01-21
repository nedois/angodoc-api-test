<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

/**
 * Class DashboardController.
 */
class DashboardController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('backend.dashboard', [
            'user' => auth()->user(),
            'agency' => auth()->user()->hasRole("administrador") ?
                collect([]) :
                collect(auth()->user()->agency)->merge(["director" => auth()->user()->agency->director]),
            'role' => auth()->user()->roles()->pluck('name')[0]
        ]);
    }
}
