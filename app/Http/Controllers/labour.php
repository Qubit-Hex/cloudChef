<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Services\schedule\SchedulePolicy;
use App\Models\employeeModel;

class labour extends Controller
{


    public function __construct(Request $request)
    {
        $this->policy  = new SchedulePolicy($request);
        $this->employee = new employeeModel();
    }

    /**
     *
     *  @method: getDaily
     *
     *  @purpose: inorder to get the daily labour of the store
     */


    public function getDaily(Request $request)
    {
        // @blueprint calculate the labour cost
        // of the store via the current day.

        function getWeekMonthYearByDate()
        {
            // return the week number, month Number and year number
            // of the current day.
            new \DateTime();
            $week = date('W');
            $month = date('m');
            $year = date('Y');
            // day number 1 - 7
            $day = date('N');
            return array($week, $month, $year, $day);
        }

        $token = $request->header('accessToken');
        $isUserAdmin  = $this->policy->isUserAdmin($token, true);
        // check if the user is admin
        if (!$isUserAdmin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $currentDay = DB::table('schedule')->where('week', getWeekMonthYearByDate()[0])
            ->where('month', getWeekMonthYearByDate()[1])
            ->where('year', getWeekMonthYearByDate()[2])
            ->where('storeID', $isUserAdmin->storeID)
            ->first();

        $currentShifts = DB::table('employee_shifts')->where('schedule_id', $currentDay->id)->get();
        $employeeSalary = $this->employee->getEmployeesSalaryByStoreID($isUserAdmin->storeID);

        for ($i = 0; $i < count($employeeSalary); $i++)
        {
            $employeeSalary[$i] = [
                'id' => $employeeSalary[$i]->id,
                'salary' => $employeeSalary[$i]->salary,
                'first_name' => $employeeSalary[$i]->first_name,
                'last_name' => $employeeSalary[$i]->last_name,
            ];
        }

        // grab the shift information for today
        $todaysLabourCost = DB::table('employee_shifts')->where('schedule_id', $currentDay->id)->where('day_of_week', getWeekMonthYearByDate()[3])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'successfully got the daily labour',
            'data' => $todaysLabourCost,
            'employeeSalary' => $employeeSalary
        ], 200);

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


}
