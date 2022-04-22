<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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




}
