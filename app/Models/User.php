<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Services\Auth\modules\encryption;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    protected $primaryKey = 'userID';

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
      *  @method: createUser
      *
      * @purpose: inorder to create the user
      */
      public function createUser($name, $email, $password, $salt) {
        return $this->create([
            'name' => $name,
            'email' => $email,
            'password' => hash('sha256', $password . $salt),
            'salt' => $salt,
            'status' => 0,
        ]);
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

        if ($remember_token === null || $remember_token === '') {
            return false;
        }

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
            return DB::table('users')->where('userID', $userID)->update(['remember_token' => $tokenValue]);
       }



       /**
        *   @method: update digital access token
        */
        public function updateDigitalAccessToken($userID, $tokenValue) {
            return $this->where('userID', $userID)->update(['digital_access_tokens' => $tokenValue]);
        }


        /**
         *
         *  @method: changePassword
         *
         *  @purpose: inorder to change the password of the user
         */

         public function changePassword($userID, $currentPassword, $newPassword)
         {
                // change the password of the current user
                $userModel = new User();

                $user = $userModel->getUserByID($userID);
                $enc = new encryption();

                if ($user->password === $currentPassword) {

                    if (strlen($newPassword) < 8) {
                        return response()->json(['status' => 'error', 'message' => 'The new password must be at least 8 characters long' ], 400);
                    }
                        // make sure the password is not the same as the current password
                    if ($enc->generatePasswordHash($newPassword, $user->salt, 'sha256') === $user->password) {
                        return response()->json(['status' => 'error', 'message' => 'The new password must be different from the current password'], 400);
                    }

                    // if the password is different, update the password
                    $userModel->where('userID', $userID)->update(['password' => $enc->generatePasswordHash($newPassword, $user->salt, 'sha256')]);
                    return true;
                }

                return false;
         }











}
