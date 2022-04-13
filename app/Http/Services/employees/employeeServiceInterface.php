<?php

/**
 *
 *  @interface: employeeServiceInterface
 *
 *  @purpose: inorder to perform the employee CRUD operatations
 *
 */


namespace App\Http\Services\employees;

use Illuminate\Contracts\Mail\Mailer;
use App\Http\Services\Auth\RegistrationRequest;
use App\Http\Services\employees\modules\validation;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\DB;


class EmployeeServiceInterface {

    /**
     *
     *  @method: add
     *
     *  @purpose: inorder to add a new employee to the store.
     *
     */

    static function add($request) {

        // query that hold our information....
        $query = [
            'token' => $request->header('accessToken'),
            'data' => $request->all()
        ];

         $generateQuery = [
             'name' => $request->input('name'),
            'username' => $request->input('email'),
            'password' => $request->input('password'),
            'address' => $request->input('address'),
            'token' => $request->input('_token'),
            'time' => time(), // time stamp the request that we will be sending to our loginService
         ];
         // first let register the user into the system
         $regReq = new RegistrationRequest($generateQuery);

         // generate the sql query to response to the user request
         $regQuery = $regReq->generateSQLQuery($generateQuery);

         if ($regQuery) {
             // first register the user. if the user is registered successfully
            $registerUser = $regReq->registerUser($generateQuery);
            // check the json response of $registerUser
            // if status.success == failed
            // add a edge case for the user already exists
            if ($registerUser->getStatusCode() === 401 && $registerUser->getData()->message != 'User already exists!') {
                // return the response to the user
                return $registerUser;
            }

              $adminStore = Validation::validateUser($query['token']) ? Validation::validateUser($query['token']) : false;
              $email = DB::table('users')->where('email', $request->input('email'))->first();
              // does a member already exist in the store_members table
              $storeCheck = DB::table('store_members')->where('userID', $email->userID)->where('storeID', $adminStore->storeID)->first();

              // $storeMembers allready exist ?
              if (!$storeCheck) {
                  // if the entry does exist then we will update the store_members table
                    $storeMembers = DB::table('store_members')->insert([
                        'userID' => $email->userID,
                        'storeID' => $adminStore->storeID,
                        'store_role' => 'employee',
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ]);
              }

              $employeeQuery = DB::table('employee')->where('storeID', $adminStore->storeID)->where('userID', $email->userID)->first();

              // does employee exist
              if (!$employeeQuery)  {
                $splitName = explode(' ', $request->input('name'));
                $employee = DB::table('employee')->insert([
                    'userID' => $email->userID,
                    'storeID' => $adminStore->storeID,
                    'department_id' => 5,
                    'first_name' => $splitName[0],
                    'last_name' => $splitName[1],
                    'address' => $request->input('address'),
                    'email' => $request->input('email'),
                    'location' => 'default',
                    'salary' => $request->input('salary'),
                    'phone' => $request->input('phone'),
                    'is_active' => 1,
                    'start_date' => date('Y-m-d H:i:s'),
                    'end_date' => NULL
                ]);

              }
              

                return response()->json([
                    'status' => 'success',
                    'message' => 'Employee added successfully',
                    'data' => 12,
                    'ins' => '111'
                ]);

            } else {
             // something went wrong the request was not successful
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Employee was not added successfully',
                    'data' => 12,
                    'ins' => '111'
                ]);
         }
    }
}


?>
