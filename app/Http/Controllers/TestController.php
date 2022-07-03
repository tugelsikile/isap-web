<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request)
    {
        $file  = $request->file('data');
        $file->move(storage_path() . '/app/public/', 'asd.png');
        dd($request->all());
    }
}
