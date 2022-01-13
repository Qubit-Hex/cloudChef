<?php

/**
 *
 *  @class: Schedule
 *
 *
 *  @purpose: inorder to perform the employee schedule CRUD operatations
 *            based on the request using the rest API.
 *
 *
 */

namespace App\Http\Controllers;

use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use App\Http\Services\Schedule\ScheduleService;

class schedule extends Controller
{


    public function constructor() {

    }

    /**
     *   @method: get
     *
     *  @purpose: inorder to get the schedule for a given user
     *
     *
     */

     public function get(Request $request) {

        $query = [
            'token' => $request->header('Authorization'),
            'time' => $request->header('time'),
            'command' => $request->header('command')
        ];

        return ScheduleService::getSchedule($query);
     }
}
