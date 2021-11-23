<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    protected $primayKey = 'userID';

    protected $fillable = [
        'name',
        'email',
        'password',
        'salt',
        'status',
        'created_at',
        'updated_at',
         
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $table = 'users';



    /**
     * 
     * 
     *  @method: getUserByEmail
     * 
     *  @purpose: inorder to user the by the email 
     * 
     */


     public function getUserByEmail($email) {
        return $this->where('email', $email)->first();
     }

     /**
      *  @method: getUserID
      *
      *  @purpose: inorder to get a user by the id number 

        @param: $userID
      */


      public function getUserByID($userID) {
        return $this->where('userID', $userID)->first();
      }

      /**
       * 
       *  @method: getUserByRemeberToken
       * 
       * 
       *   @purpoise: inorder to get a user by the remember token
       * 
       *  @param: $rememberToken
       */


      public function getUserByRemeberToken($remember_token) {
        return $this->where('remember_token', $remember_token)->first();
      }

      /**
       *  
       * @method: updateToken 
       * 
       *    @purpoose: inorder to update the token of the user
       * 
       *  @return: vold
       */
       public function updateToken($tokenValue, $userID) {
            return $this->where('userID', $userID)->update(['remember_token' => $tokenValue]);
       }



       /**
        *   @method: update digital access token
        */
        public function updateDigitalAccessToken($userID, $tokenValue) {
            return $this->where('userID', $userID)->update(['digital_access_tokens' => $tokenValue]);
        }








    


}
