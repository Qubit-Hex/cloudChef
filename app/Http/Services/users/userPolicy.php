<?php

/**
 *
 *
 *  @file: app/Http/Services/users/userPolicy.php
 *
 *  @purpose: inorder to impliment the policy filter and validation for the user object
 *
 */



 namespace App\Http\Services\users;

 use App\Models\User;
 use App\Models\store_members;
 use Illuminate\Support\Facades\DB;

class userPolicy {


    public function __construct($request)
    {
        $this->User = new User();
        $this->member = new store_members();
        $this->request = $request;
    }

    /**
     *
     *  @method: validate the user request
     *
     *  @purpose: to validate the users request and if the request is valid we will return true or false or object if the user specified
     *
     */

    public function validateUserRequest($token, $userObject = false)
    {
      $userRequest = $this->User->getUserByRemeberToken($token);

      if (!$userRequest) {
        return false;
      }
      // check if we have to return the object or the boolean
        return $userObject ? $userRequest : true;
    }

    /**
     *
     *  @method: isUserAdmin
     *
     *  @purpose: to check if the user is an admin
     *
     */

    public function isUserAdmin($token, $dataObject = false)
    {
        $userRequest = $this->User->getUserByRemeberToken($token, true);
        if ($userRequest) {
            $storeMembership = $this->member->getMembersByID($userRequest->userID);
            if ($storeMembership) {
                // is the user admin or not ?
                return $dataObject === true ?  $this->member->getStoreAdmin($storeMembership->storeID, $userRequest->userID) : true;
            }
            return false;
        }
    }


    /**
     *
     *  @method: isUserMember
     *
     *  @purpose: to check if the user is a member of the store or not
     *
     */
    public function isUserMember($token, $dataObject = false)
    {
        $user = $this->validateUserRequest($token, true);
        if ($user) {
            // return the users store status to the user
            $memberStatus = $this->member->getMembersByID($user->userID);
            return $dataObject === true ? $memberStatus : true;
        }
        return false;
    }
}



?>
