<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_registration_log extends Model
{
    use HasFactory;


    protected $table = 'user_registration_log';
    protected $primaryKey = 'log_number';

    protected $fillable = [
        'ip_address',
        'user_agent',
        'created_at',
        'updated_at'];
}
