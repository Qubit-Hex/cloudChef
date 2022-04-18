<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class store extends Model
{
    use HasFactory;

    protected $table = 'store';
    protected $primaryKey = 'storeID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'email', 'signature_token'];


    /**
     *
     *  @method: createStore
     *
     *
     *  @purpose: to create a new store
     *
     */

     public function createStore($name, $email, $signature)
     {
         return DB::table('store')->insert([
             'name' => $name,
             'email' => $email,
             'signature_token' => $signature,
         ]);
     }

     /**
      * @method: getStoreByEmail
      *
      * @purpose: to get store data by email
      *
      */

      public function getStoreByEmail($email)
      {
          return $this->where('email', $email)->first();
      }

     /**
      * @method: deleteStore
      *
      *
      *  @purpose: to delete a store
      *
      */

      public function deleteStore($storeID)
      {
            return DB::table('store')->where('storeID', $storeID)->delete();
      }
}
