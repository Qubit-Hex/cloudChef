<?php

namespace App\Http\Controllers;

use App\Http\Controllers\validation\employeeValidation;
use App\Models\employeeModel;
use App\Models\User;
use App\Models\store;
use App\Models\user_sessions;
use App\Models\store_members;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


/**
 *
 *  @class: employee
 *
 *
 *  @purpose: inorder to perform the employee CRUD operatations
 *
 *
 */


class employee extends Controller
{

    /**
     * @function: __construct
     *
     * @purpose: to initialize the class
     *
     *
     */


    public function __construct()
    {
        // place all of our behaviours here
        $this->user = new User();
        $this->store = new store();
        $this->storeMembers = new store_members();
        $this->userSession = new user_sessions();
        $this->employee = new employeeModel();

    }

    /**
     *
     *  @method: get
     *
     *  @purpose: inorder to get the employee details by the id number of a store
     *
     */

    public function get(Request $request, $id)
    {

        // refactor this section.

        // refactor this later into a better format.
        $clientToken = $request->header('accessToken');
        // check if the user exists in the database
        $user = DB::table('users')->where('remember_token', $clientToken)->first();

        if ($user) {
            // next check if the user belongs to the store we are assocated with
            $store_members = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($store_members) {
                // next lets check if the
                $employee = DB::table('employee')->where('storeID', $store_members->storeID)->where('id', $id)->first();

                $userImg = DB::table('user_profile')->where('userID', $employee->userID)->first()->img;

                // if the employee exists
                if ($employee) {
                    // next we need to retrive other other information before returning the employee data to the client

                    // PLEASE NOTE: WE NEED SOME DATABASE REFACTORING HERE
                    // SO THAT WE DONT HAVE TODO HACKY STUFF INORDER TO GET OUR DATA

                    $department = DB::table('department')->where('id', $employee->department_id)->first()->name;

                    return response()->json([
                        'name' => $employee->first_name . ' ' . $employee->last_name,
                        'department' => $department,
                        'url' => $userImg
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'employee not found'
                    ]);
                }
            }
            // trigger error user does not belong to the store
            return response()->json(['error' => 'user does not belong to the store'], 401);
        }
        return response()->json(['message' => 'failed'], 401);
    }

    /**
     *
     *  @method: showCurrentEmployees
     *
     *  @purpose: inorder to get the current employees of the store
     */

    public function showCurrentEmployees(Request $request)
    {

        // modals for the method

        $userModel = new User();
        $storeModel = new store();
        $storeMemberModel = new store_members();
        $userSessionModel = new user_sessions();
        $employeeMod = new employeeModel();

        // check if the request is an api or cookie request
        if (isset($_COOKIE['accessToken'])) {
            $clientToken = $_COOKIE['accessToken'];
        } else {
            $clientToken = $request->header('accessToken');
        }

        // get the user id from the token

        $currentUser = $userModel->getUserByRemeberToken($clientToken);
        $currentMember = $storeMemberModel->getMembersByID($currentUser->userID);
        $DB = DB::table('employee')->where('storeID', $currentMember->storeID)->get();

        /**
         *  @stub: result
         *  name -> name of employee
         *  id -> id of employee
         * department -> department of employee
         * phone -> phone number of employee
         * email -> email of employee
         * role -> role of the employee
         */

        // authenticate the user before proceeding to the request

        $user = DB::table('users')->where('remember_token', $clientToken)->first();

        if ($user) {
            $store_members = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($store_members) {
                $employees = DB::table('employee')->where('storeID', $store_members->storeID)->get();

                $result = [];

                foreach ($employees as $employee) {
                    $result[] = [
                        'name' => $employee->first_name . ' ' . $employee->last_name,
                        'id' => $employee->id,
                        'department' => DB::table('department')
                            ->where('id', $employee->department_id)
                            ->first()->name,
                        'address' => $employee->address,
                        'phone' => $employee->phone,
                        'location' => $employee->location,
                        'email' => $employee->email,

                    ];
                }

                return response()->json([
                    'status' => 'success',
                    'data' => $result,
                    'eData' => $employees
                ]);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'user does not belong to the store'
            ], 401);
        }
        return response()->json($DB);
    }

    /**
     *  @method: add ( employee )
     *
     *
     *  @purpose: inorder to add a new employee to the store.
     *
     */
    public function add(Request $request)
    {
        // purpose of this method is to add a new employee to the store.
        $userModel = new User();
        $storeModel = new store();
        $storeMemberModel = new store_members();
        $userSessionModel = new user_sessions();
        $employeeMod = new employeeModel();

        // first lets findout if the user we are talking to is a admin of the store or not \
        $currentUser = $userModel->getUserByRemeberToken($request->header('accessToken'));
        // not lets find out what store this user belongs to
        $currentMember = $storeMemberModel->getMembersByID($currentUser->userID);

        // does the user exist?
        if (!$currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }

        // is the member a part of any store in the system ?
        if (!$currentMember) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not belong to the store'
            ], 401);
        }

        // next lets check if the user is a admin of the store
        if ($currentMember->store_role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'user is not a admin of the store'
            ], 401);
        }


        # ===================== user input of the request =====================

        $name = $request->input('name');  // text
        $email = $request->input('email'); // email
        $phone = $request->input('phone'); // phone
        $address = $request->input('address'); // string
        $position = $request->input('position'); // this is the position of the employee
        $salary = $request->input('salary'); // int
        $dob = $request->input('dob'); // string date
        $location = $request->input('location'); // string
        $password = $request->input('password'); // string
        $salt = hash('sha256', bin2hex(openssl_random_pseudo_bytes(64))); // string


        // validate the user input before continuing the request.

        // validate the length of the name.
        if (!employeeValidation::validateString($name, 3))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'name is not valid must be at least 3 characters'
            ], 401);
        }


        // validate the email
        if (!employeeValidation::validateEmail($email))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'email is not valid'
            ], 401);
        }

        // validate the phone number
        if (!employeeValidation::validatePhone($phone))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'phone number is not valid'
            ], 401);
        }

        // validate the adddress
        if (!employeeValidation::validateString($address, 3))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'address is not valid must be at least 3 characters'
            ], 401);
        }


        // does email exist in the system ?
        if ($userModel->getUserByEmail($email)) {
            return response()->json([
                'status' => 'error',
                'message' => 'email already exists'
            ], 401);
        }

        // validate the location
        if (!employeeValidation::validateString($location, 3))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'location is not valid must be at least 3 characters'
            ], 401);
        }


        // register the employee into the system.
        $registerUser = $userModel->createUser($name, $email, $password, $salt);

        if (!$registerUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // register the employee into the store.
        $registerMember = $storeMemberModel->createMember(
            $registerUser->userID,
            $currentMember->storeID,
            'employee'
        );

        // register the employee as a member into the system
        if (!$registerMember) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // store the
        $firstname = explode(' ', $name)[0];
        $lastname = explode(' ', $name)[1];

        // show success of fail of the registration
        // of the new employee into the system.
        $hireEmployee = $employeeMod->createEmployee(
            $registerMember->userID,
            $currentMember->storeID,
            $firstname,
            $lastname,
            $address,
            $location,
            $email,
            $phone,
            $salary
        );

        if (!$hireEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // the user has been registered successfully
        return response()->json([
            'status' => 'success',
            'message' => 'user has been registered successfully'
        ]);
    }

    /**
     *
     *  @method: edit ( employee )
     *
     *
     * @purpose: inorder to edit an existing employee of the store.
     *
     *
     */

    public function edit(Request $request)
    {

        // models
        $userModel = new User();
        $storeModel = new store();
        $storeMemberModel = new store_members();
        $userSessionModel = new user_sessions();
        $employeeMod = new employeeModel();


        // user inputs that need to procced to validation
        $id = $request->input('id');
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $address = $request->input('address');
        $location = $request->input('location');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $salary = $request->input('salary');
        $is_active = $request->input('is_active');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');


        // get the store of the current user by using the access
        // token
        $currentUser = $userModel->getUserByRemeberToken($request->header('accessToken'));

        if (!$currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }

        // next let get the store of the current user

        $currentUserStore = $storeMemberModel->
                            getMembersByID($currentUser->userID);

        if (!$currentUserStore) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }


        $memberAdmin = $storeMemberModel->storeMemberAdmin($currentUserStore->storeID, $currentUser->userID);


        if (!$memberAdmin) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not have the correct permissions'
            ], 401);
        }


        // next lets get the employee of the store that matches the
        // storeID and ID from the employee table

        $currentWorker = $employeeMod->getStoreEmployeeByID($currentUserStore->storeID, $id);

        // check if the employee exists
        if (!$currentWorker) {

            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }

        // validate the user inputs

        // validate the first name
        if (!employeeValidation::validateString($firstName, 2))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'first name is not valid must be at least 3 characters'
            ], 401);
        }

        // validate the last name
        if (!employeeValidation::validateString($lastName, 2))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'last name is not valid must be at least 3 characters'
            ], 401);
        }

        // validate the address
        if (!employeeValidation::validateString($address, 3))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'address is not valid must be at least 3 characters'
            ], 401);
        }

        // validate the location
        if (!employeeValidation::validateString($location, 3))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'location is not valid must be at least 3 characters'
            ], 401);
        }


        // validate the email
        if (!employeeValidation::validateEmail($email))
        {
            return response()->json([
                'status' => 'error',
                'message' => 'email is not valid'
            ], 401);
        }

        // update the employees information.
        $updateEmployeeData = $employeeMod->updateEmployeeInfo(
            $id,
            $firstName,
            $lastName,
            $address,
            $location,
            $phone,
            $email,
            $salary,
            $is_active == true ? 1 : 0,
            $start_date,
            $end_date === empty($end_date) ? null : $end_date
        );



        // check did the information update successfully or not?
        if (!$updateEmployeeData) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update the employees information',
                'salary' => $request->all()
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Employee information has been updated successfully'
            ]);
        }

    }

    /**
     *
     *  @method: delete <DELETE>
     *
     *  @purpose: inorder to delete an existing employee of the store.
     *
     */

    public function delete(Request $request)
    {


        // models
        $userModel = new User();
        $storeMemberModel = new store_members();
        $employeeMod = new employeeModel();

        // check if the custom headers is set of our request
        if (empty($request->header('employeeID')) || empty($request->header('accessToken'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid request'
            ], 401);
        }

        // next lets get the admin users information

        $admin = $userModel->getUserByRemeberToken($request->header('accessToken'));
        $storeAdmin = $storeMemberModel->getMembersByID($admin->userID);

        // check if the request was made by an admin
        if ($storeAdmin->store_role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not have the correct permissions'
            ], 401);
        }

        // lets see if we have the correct rights inorder to access this users information
        $getEmployee = $employeeMod->getStoreEmployeeByID($storeAdmin->storeID, $request->header('employeeID'));

        if (!$getEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not have the correct permissions.'
            ], 401);
        }

        // request the information about the said employee of the store
        $currentEmployee = $employeeMod->getStoreEmployeeByID($storeAdmin->storeID, $request->header('employeeID'));

        // delete the entry in
        // check if the employee exists within the system
        if (!$currentEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }

        // if the user does exist then delete the user out of our system
        $disable_employee = $employeeMod->disableEmployee($currentEmployee->userID, $currentEmployee->storeID);
        $disable_storeMember = $storeMemberModel->disableStoreMember($currentEmployee->userID);
        $delete_user = $userModel->deleteUser($currentEmployee->userID);

        // delete the store roles and delete the user from the system

        if (!$disable_employee || !$disable_storeMember || !$delete_user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete the employee',
                'debug' => [
                    'disable_employee' => $disable_employee,
                    'disable_storeMember' => $disable_storeMember,
                    'delete_user' => $delete_user
                ]
            ]);

        }
        else {
            return response()->json([
                'status' => 'success',
                'message' => 'Employee has been deleted successfully'
            ]);
        }

    }
}
