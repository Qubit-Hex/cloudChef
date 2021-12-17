<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class store_members extends Controller
{
    public function get(Request $request)
    {
        // search for member in store 
        $members = DB::table('user_profile')->where('name', 'LIKE', $request->input('search'))->get();
        return response()->json( ['content' => $members,
                        'search' => $request->input('search')], 200);
    }

    public function update(Request $request)
    {

    }
}
