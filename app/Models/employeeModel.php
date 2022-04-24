<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class employeeModel extends Model
{
    use HasFactory;


    protected $table = 'employee';

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
     *  @method: createEmployee
     *
     *  @purpose: to add an employee into the system.
     *
     */

    public function createEmployee($userID, $storeID, $first, $last, $address, $location, $email, $phone, $salary)
    {

        return DB::table('employee')->insert([
            'userID' => $userID,
            'storeID' => $storeID,
            'department_id' => 3, // this is temporary until we have a department system
            'first_name' => $first,
            'last_name' => $last,
            'address' => $address,
            'location' => $location,
            'email' => $email,
            'phone' => $phone,
            'salary' => $salary,
            'is_active' => 1,
            'start_date' => date('Y-m-d'),
            'end_date' => null
        ]);
    }


    /**
     *
     *  @method: getEmployeeByID
     *
     *  @purpose: inorder to get employee data by id
     *
     */

    public function getEmployeeByID($id)
    {
        $employee = DB::table('employee')->where('id', $id)->first();

        return $employee;
    }


    /**
     *
     *  @method: getStoreEmployeeByID
     *
     *  @purpose: inorder to get an employee of the database where storeID and id match
     *
     */

    public function getStoreEmployeeByID($storeID, $id)
    {
        return $this->where('storeID', $storeID)->where('id', $id)->first();
    }


    /**
     *
     *  @method: changeEmployeeAddress
     *
     *  @purpose: to change the addresss of the employee.
     */

    public function changeEmployeeAddress($id, $address)
    {
        // ONLY change the address of the employes

        $employee = DB::table('employee')->where('userID', $id)->get();

        // change all the information that the user is associated with
        foreach ($employee as $employee) {
            if (!DB::table('employee')->where('userID', $id)->update(['address' => $address])) {
                //  if the update fails
                return false;
            }
        }
        return true;
    }

    /**
     *
     *  @method: getEmployeeByStoreAndUserID
     *
     *
     *  @purpose; to get an employee by their userID and their store ID
     *
     *
     */

     public function getEmployeeByStoreAndUserID($storeID, $userID)
     {
         return $this->where('storeID', $storeID)->where('userID', $userID)->first();
     }


    /**
     *
     *  @method: getEmployeeByAddress
     *
     *  @purpose: inorder to get the employee by the address
     *
     */

    public function getEmployeeByAddress($address, $id)
    {
        $employee = DB::table('employee')->where('address', $address)->where('userID', '=', $id)->first();

        return $employee;
    }



    /**
     *
     *  @method: changeEmployeePhoneNumber
     *
     *  @purpose: inorder to change the phone number of the employee
     *
     */

    public function changeEmployeePhoneNumber($id, $phone)
    {
        // ONLY change the phone number of the employes

        $employee = DB::table('employee')->where('userID', $id)->get();

        // change all the information that the user is associated with
        foreach ($employee as $employee) {
            if (!DB::table('employee')->where('userID', $id)->update(['phone' => $phone])) {
                //  if the update fails
                return false;
            }
        }
        return true;
    }


    /**
     *
     *  @method: changeEmployeeLocation
     *
     *  @purpose: inorder to change the location of the employee
     *
     */

    public function changeEmployeeLocation($userID, $location)
    {
        $employee = DB::table('employee')->where('userID', $userID)->get();

        // change all the information that the user is associated with
        foreach ($employee as $employee) {
            if (!DB::table('employee')->where('userID', $userID)->update(['location' => $location])) {
                //  if the update fails
                return false;
            }
        }
        return true;
    }


    /**
     *   @method: updateEmployeeInfo
     *
     *   @purpose: inorder to update the employee information
     *
     */

    public function updateEmployeeInfo($id, $first_name, $last_name, $address, $location, $phone, $email, $salary, $is_active, $start_date, $end_date)
    {

        return DB::table('employee')->where('id', $id)->update([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'address' => $address,
            'location' => $location,
            'phone' => $phone,
            'email' => $email,
            'salary' => (int)$salary,
            'is_active' => $is_active,
            'start_date' => $start_date,
            'end_date' => $end_date
        ]);
    }


    /**
     *
     *  @method: disableEmployee
     *
     *
     *  @purpose: inorder to disable an employee from the system
     *
     *
     */

    public function disableEmployee($id, $storeID)
    {
        // update is_active and end_date
        return DB::table('employee')->where('userID', $id)->where('storeID', $storeID)->update([
            'is_active' => 0,
            'end_date' => date('Y-m-d')
        ]);
    }
}
