<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_sessions extends Model
{
    use HasFactory;


    protected $table = 'user_sessions';

    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
       'user_id',
       'token',
       'secret',  // this is the token value + ip address of the user. This is used to verify the user
       'created_at',
       'updated_at',
       'active'
    ];

    /**
     *
     *  @method: createSession
     *
     *  @purpose: to create a new session
     *
     */

     public function createSession($userID, $token, $secret)
     {
            return $this->create([
                'user_id' => $userID,
                'token' => $token,
                'secret' => $secret,
                'active' => 1
            ]);
     }
}
