<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', function () {
    return view('Auth.login');
});

Route::group(['prefix' => 'absensi'], function () {
    Route::get('/', function () {
        return view('Absensi.Index');
    });
    Route::get('/start', function () {
        return view('Absensi.Start');
    });
});

// Route::any('/absensi', function () {
//     return view('Absensi.Index');
// });

// Route::get('/absensi/start', function () {
//     return view('Absensi.Start');
// });