<?php

use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Frontend\AgenciesController;
use App\Http\Controllers\Frontend\CommonQuestionsController;

/*
 * Frontend Controllers
 * All route names are prefixed with 'frontend.'.
 */

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('contato', [ContactController::class, 'index'])->name('contact');
Route::post('contato/send', [ContactController::class, 'send'])->name('contact.send');
Route::get('agencias', [AgenciesController::class, 'index'])->name('agencies');
Route::get('perguntas-frequentes', [CommonQuestionsController::class, 'index'])->name('commonquestions');

Route::middleware('auth')->group(function () {
  Route::redirect('/painel-de-controle', '/painel-de-controle/visao-geral', 301)->name('admin.dashboard');
  Route::get('/painel-de-controle/{uri}', [DashboardController::class, 'index'])->where('uri', '.*');
});
