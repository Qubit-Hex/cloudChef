<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class employee_shifts extends Model
{
    use HasFactory;


    protected $table = 'employee_shifts';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id',
        'schedule_id',
        'employee_id',
        'start_time',
        'end_time',
        'day_of_week',
        'dropped',
        'off',
        'created_at',
        'updated_at'
    ];

    /**
     *
     *  @method: getEmployeeShifts
     *
     *
     *  @purpose: to get all the shifts for a specific employee thats ties to a specific schedule
     *
     */

     public function getEmployeeShifts($store, $scheduleID, $employeeID)
     {
         // do inner join on the employee_shifts tables and the schedule table
         // to get all the shifts for a specific employee that is tied to a specific schedule)
            $innerJoin = DB::table('employee_shifts')->
            join('schedule', 'schedule.id', '=', 'employee_shifts.schedule_id')
            ->where('schedule.storeID', $store)
            ->where('employee_shifts.schedule_id', $scheduleID)
            ->where('employee_shifts.employee_id', $employeeID)->get();

            return $innerJoin;
     }


     /**
      *  @method: postEmployeeShifts
      *
      *  @purpose: to create a new shift for a specific employee
      *
      */

      public function postEmployeeShifts($schedule_id, $employee_id, $start, $end, $day, $off)
      {

        // lets check if the schedule already exist if so then we will update the shift
        // instead of creating a new one
        $check = DB::table('employee_shifts')->where('schedule_id', $schedule_id)->where('employee_id', $employee_id)->
                    where('day_of_week', $day)->first();

        if ($check) {
            return DB::table('employee_shifts')->where('schedule_id', $schedule_id)->where('employee_id', $employee_id)->
                    where('day_of_week', $day)->update(['start_time' => $start, 'end_time' => $end, 'off' => $off]);
        }
        // no shift was found so lets create a new one
          return $this->insert([
              'schedule_id' => $schedule_id,
              'employee_id' => $employee_id,
              'start_time' => $start,
              'end_time' => $end,
              'day_of_week' => $day,
              'dropped' => 0,
              'off' => $off
          ]);
      }


      /**
       *
       *   @method: deleteEmployeeShift
       *
       *  @purpose: to delete a specific shift for a specific employee
       *
       */

       public function deleteEmployeeShift($schedule_id, $employee_id, $day)
       {
          // delete shift
            $check =  DB::table('employee_shifts')->where('schedule_id', $schedule_id)->where('employee_id', $employee_id)->
                    where('day_of_week', $day)->first();


           return DB::table('employee_shifts')->where('id', $check->id)->delete();
       }

}
