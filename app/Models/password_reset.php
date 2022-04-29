<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class password_reset extends Model
{
    use HasFactory;


    protected $table = 'password_reset';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'token', 'user_id', 'created_at'];


    /**
     *
     *  @method: add
     *
     *
     *  @purpose: inorder to add a password reset entry to the system \
     *
     */

    public static function add($email, $token, $user_id)
    {
        // does the entry already exist ?
        $entry = password_reset::where('email', $email)->first();

        if (!$entry) {
                // add the entry
                $entry = password_reset::create([
                    'email' => $email,
                    'token' => $token,
                    'user_id' => $user_id,
                    'created_at' => date('Y-m-d H:i:s'),
                ]);

                return $entry;
        } else {
            // update the entry
            $entry->token = $token;
            $entry->user_id = $user_id;
            $entry->updated_at = date('Y-m-d H:i:s');
            $entry->save();
        }
    }




}
