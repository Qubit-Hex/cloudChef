<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sessions extends Model
{
    use HasFactory;


    protected $table = 'sessions';
    protected $primaryKey = 'sessionID';


    /**
     * 
     * @method: makeSession
     * 
     * @purpose: inorder to make new insert in the sessions table 
     * 
     * @param: 
     */
    public function makeSession($userID, $signature, $encryptedPayload)
    {
       $result =  sessions::insert([
            'user_ID' => $userID,
            'signature' => $signature,
            'token' => $encryptedPayload,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT'],
            'session_expiry' => date('Y-m-d H:i:s', strtotime('+1 hour')),
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     *  @method: getSessions by Signature 
     * 
     *  @method: returns the session by the signature
     */

     public function getSessionsBySignature($signature)
     {
         return $this->where('signature', $signature)->first();
  
     }


     /**
      *  @method: validateSession by signature 
      *
      * @purpose: to check if a session exists in the database wuth that signature
      */

      public function validateSignature($signature)
      {
            $result = $this->where('signature', $signature)->first();
            if (!$result) {
                return false;
            }
            return true;
        }
}
