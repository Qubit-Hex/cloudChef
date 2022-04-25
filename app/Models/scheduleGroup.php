<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


//fff
class scheduleGroup extends Model
{
    use HasFactory;



    protected $table = 'schedule';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'storeID',
        'year',
        'week',
        'month',
        'created_at',
        'updated_at'
    ];

    /**
     *
     *  @method: createScheduleGroup
     *
     *  @purpose: to create a new schedule group
     *
     */

    public function createScheduleGroup($year, $month, $week, $storeID)
    {
        return $this->insert([
            'year' => $year,
            'month' => $month,
            'week' => $week,
            'storeID' => $storeID,
            'created_at' => now(),
            'updated_at' => null
        ]);
    }

    /**
     *
     * @method: getScheduleGroup
     *
     *  @purpose: to get a schedule group
     *
     */

     public function getScheduleGroup($year, $month, $week, $storeID)
     {
            return $this->where([
                ['year', $year],
                ['month', $month],
                ['week', $week],
                ['storeID', $storeID]
            ])->first();
     }


     /**
      *  @method: getScheduleEntry
      *
      *  #purpose: to get a schedule entry
      *
      */

      public function getScheduleEntry($id) {
          return $this->where('id', $id)->first();
      }


      /**
       *
       *  @method: getSchedulesByStore
       *
       *  @purpose: to get all schedules by store
       *
       */

       public function getSchedulesByStore ($storeID)
       {
            // sort from latest to oldest
            return $this->where('storeID', $storeID)->orderBy('week', 'desc')->get();
       }

       /**
        *  @method: findSchedule
        *
        *  @purpose: inorder to find a schedule if it is in the system.
        *
        */

        public function findSchedule($id, $storeID)
        {
            return $this->where('id', $id)->where('storeID', $storeID)->first();
        }


        /**
         *
         * @method: deleteSchedule
         *
         * @purpose: inorder to delete the schedule from the system if it exists in the system
         *
         */

         public function deleteSchedule($id, $storeID)
         {
             // find the schedule entry and delete all the shifts associated with it
             $schedule = $this->where('id', $id)->where('storeID', $storeID)->delete();
             $shifts = DB::table('employee_shifts')->where("schedule_id", $id)->get();

             // is there shift entries associated with the schedule
             if (count($shifts) > 0) {
                 // delete all the shifts associated with the schedule
                 return DB::table('employee_shifts')->where("schedule_id", $id)->delete();
             } else {
                 // there are no shifts associated with the schedule
                 // just delete the schedule entry since there are no shifts
                 // associated with that id.
                    return true;
             }


         }



}
