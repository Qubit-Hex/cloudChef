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
        // @blueprint calculate the labour cost
        $token = $request->header('accessToken');
        $scheduleID = $request->header('scheduleID');
        $isUserAdmin = $this->policy->isUserAdmin($token, true);

        // check if the user is a admin
        if (!$isUserAdmin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // next lets get the store of the user
        $storeID = $isUserAdmin->storeID;
        $schedule = DB::table('schedule')->where('id', $scheduleID)->
                    where('storeID', $storeID)->first();


        if ($schedule)  {
            // schedule was found so lets get the shifts

            $shifts = DB::table('employee_shifts')->where('schedule_id', $scheduleID)->get();
            $salary = $this->employee->getEmployeesSalaryByStoreID($storeID);

            $employeeData = [];

            for ($i = 0; $i < count($salary); $i++)  {
                // loop through the shifts inorder to get the employees total hours

                $employeeData[$salary[$i]->id] = [
                    'id' => $salary[$i]->id,
                    'salary' => floor($salary[$i]->salary / 52 / 40),
                    'first_name' => $salary[$i]->first_name,
                    'last_name' => $salary[$i]->last_name,
                    'totalHours' => 0
                ];

                for ($j = 0; $j < count($shifts); $j++)  {
                    // loop through the shifts inorder to get the employees total hours
                    if ($shifts[$j]->employee_id === $salary[$i]->id)  {
                        // convert time into float and add to total hours

                        // replace the colon with a dot

                        if ($shifts[$j]->start_time !== null)  {
                            $start =  (float) str_replace(':', '.', $shifts[$j]->start_time);
                        } else {
                            $start = 0;
                        }

                        if ($shifts[$j]->end_time !== null)  {
                            $end = (float) str_replace(':', '.', $shifts[$j]->end_time);
                        } else {
                            $end = 0;
                        }

                        // check if the start time is greater than the end time
                        if ($start > $end)  {
                            // add 24 hours to the end time
                            $end += 24;
                        }

                        
                        // always return a positive number
                        $totalTime = $end - $start;
                        // convert negitive to positive
                        if ($totalTime < 0) {
                            $totalTime = $totalTime * -1;
                        }

                        $employeeData[$salary[$i]->id]['totalHours'] += $totalTime;
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'successfully got the weekly labour',
                'data' => $employeeData,
                'shifts' => $shifts

            ], 200);
        }

        // return error
        return response()->json(['error' => 'Schedule not found'], 404);
    }


}
