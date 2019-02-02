<?php

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

// Route::resource('/companies', 'CompaniesController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
// Route::resource('/employees', 'EmployeesController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);

// Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
// Route::post('login', 'Auth\LoginController@login');
// Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Route::get('/home', 'HomeController@index')->name('home');

Route::any('{all}', function () {
    return view('welcome');
 })->where('all', '.*');