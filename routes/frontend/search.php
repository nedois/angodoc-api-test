<?php

use App\Http\Controllers\Frontend\Search\SearchController;

/*
 * Frontend Controllers
 * All route names are prefixed with 'frontend.search.'.
 */
Route::group(['namespace' => 'Search', 'as' => 'search.'], function () {
    Route::get('resultados-da-pesquisa', [SearchController::class, 'show'])->name('show');
});
