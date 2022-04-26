<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class labour extends Controller
{
    /**
     *
     *  @method: getDaily
     *
     *  @purpose: inorder to get the daily labour of the store
     */

    public function getDaily(Request $request)
    {

    }



    /**
     *
     *  @method: getWeekly
     *
     *  @purpose: inorder to get the weekly labour of the store
     */
    public function getWeekly(Request $request)
    {
        // @blueprint
        // total cost of the weeks labour
        // via each week to a point of 4 weeks. 

        return response()->json([
            'status' => 'success',
            'message' => 'Weekly Labour',
            'data' => [
                'labour' => [
                    'name' => 'John Doe',
                    'date' => '2019-12-12',
                    'time' => '12:00',
                    'hours' => '8',
                    'rate' => '10',
                    'total' => '80'
                ]
            ]
        ]);
    }

    /**
     *
     *  @method: getMonthly
     *
     *
     *  @purpose: inorder to get the monthly labour of the store
     */

    public function getMonthly(Request $request)
    {

    }
}
