<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_activation extends Model
{
    use HasFactory;


    protected $table = 'user_activation';



    protected $fillable = [
        'user_id', 'activation_code', 'created_at', 'updated_at'
    ];


    /***
     *
     *  @method: isActivated
     *
     *  @purpose: to check for an entry in the user activation table
     *
     */

     public function getActivationRecord($userID)  {
            $userActivation = user_activation::where('user_id', $userID)->first();
            return $userActivation ? true : false;
     }


     /**
      *
      *  @method: createActivationRecord
      *
      *  @purpose: inorder to create a activation record for newly created users.
      *
      */

      public function createActivationRecord($userID, $token) {

            $userActivation = new user_activation;
            $userActivation->user_id = $userID;
            $userActivation->activation_code = $token;

            return $userActivation->save();
      }
}
