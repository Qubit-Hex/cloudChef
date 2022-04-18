<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_fingerprint extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $primayKey = 'id';


    protected $fillable = [
        'userIP',
        'userAgent',
        'time',
        'requestData',
        'requestType',
        'signature',
        'sessionToken'
    ];

    /**
     *
     *  @method:  add
     *
     *  @purpose: inorder to insert a fingerprint
     *
     */
    public function add($userIP, $userAgent, $time, $requestData, $requestType, $signature, $sessionToken)
    {
        $this->userIP = $userIP;
        $this->userAgent = $userAgent;
        $this->time = $time;
        $this->requestData = $requestData;
        $this->requestType = $requestType;
        $this->sessionToken = $sessionToken;
        $this->signature = $signature;
        $this->save();
    }


}
