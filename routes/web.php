<?php

use App\Http\Controllers\LanguageController;
use CloudCreativity\LaravelJsonApi\Facades\JsonApi;
use App\Http\Controllers\Frontend\Search\SearchController;
use App\Http\Controllers\Frontend\AgenciesController;


/*
 * Global Routes
 * Routes that are used between both frontend and backend.
 */

// Switch between the included languages
Route::get('lang/{lang}', [LanguageController::class, 'swap']);

/*
 * Frontend Routes
 * Namespaces indicate folder structure
 */
Route::group(['namespace' => 'Frontend', 'as' => 'frontend.'], function () {
    include_route_files(__DIR__ . '/frontend/');
});

Route::get('agenciesByProvince/{province}', [AgenciesController::class, 'index']);
Route::get('resultados-da-pesquisa/{reference}', [SearchController::class, 'show'])->name('show');

JsonApi::register('v1')
    ->middleware('auth')
    ->routes(function ($api) {
        $api->resource('documents', ['has-one' => ['creator', 'finder', 'agency']])->readOnly();
        $api->resource('users', ['has-one' => 'agency'])->readOnly();
        $api->resource('agencies', ['has-many' => ['users', 'documents'], 'has-one' => 'director'])->readOnly();
        $api->resource('finders', ['has-one' => ['creator', 'agency'], 'has-many' => 'documents'])->readOnly();
    });

Route::group(['namespace' => 'PseudoApi', 'prefix' => 'pseudoapi', 'as' => 'pseudoApi.'], function () {
    Route::group(['middleware' => 'admin'], function () {
        Route::post('/documents/{document}/markAsRecovered', 'DocumentController@recovered');
        Route::post('/documents/{document}/unmarkAsRecovered', 'DocumentController@unrecovered');
        Route::apiResource('/documents', 'DocumentController');
        Route::apiResource('/finders', 'FinderController');
        Route::get('/agencies/{agency}/users', 'AgencyController@users');
        Route::apiResource('/agencies', 'AgencyController');
        Route::apiResource('/users', 'UserController');
    });
});
