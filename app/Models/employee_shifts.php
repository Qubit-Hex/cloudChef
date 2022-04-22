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
     
}
