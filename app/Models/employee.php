<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee extends Model
{
    use HasFactory;

     protected $primaryKey = 'id';


    protected $fillable = [
        'department_id',
        'first_name',
        'last_name',
        'address',
        'location',
        'phone',
    ];



    /**
     *
     *  @method: changeEmployeeAddress
     *
     *  @purpose: to change the addresss of the employee.
     */

     public function changeEmployeeAddress($id, $address) {

        $employee = $this->where('userID', $id)
                            ->first();
        if($employee) {
            $employee->address = $address;
            $employee->save();
            return true;
        }

        return false;
    }


}
