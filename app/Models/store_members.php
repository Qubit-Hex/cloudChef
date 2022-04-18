<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class store_members extends Model
{
    use HasFactory;

    protected $primaryKey = 'store_memberID';

    protected $table = 'store_members';

    protected $fillable = [
        'store_MemberID',
        'storeID',
        'userID',
        'store_role',
        'created_at',
        'updated_at'
    ];

       /**
     *
     *  @method: getMemberByID
     *
     *
     *  @purpose: inorder to get employee data by id
     *
     */

    public function getMembersByID($id)
    {
       return $this->where('userID', $id)->first();
    }


    /**
     *
     * @method: createMember
     *
     * @purpose: to create a new member
     *
     */

     public function createMember($userID, $storeID, $role)
     {
         return $this->create([
                'userID' => $userID,
                'storeID' => $storeID,
                'store_role' => $role,
            ]);
     }


    /**
     *  @method: verifyStoreMember
     *
     *  @purpose: This method is used to verify the ownership of the store
     *
     */


     public function verifyStoreMembership($storeID, $userID) {

        $store_member = store_members::where('store_memberID', $storeID)
                                    ->where('userID', $userID)
                                    ->first();

        if($store_member) {
            return true;
        } else {
            return false;
        }
    }

        /**
         *  @method: storeMemberRole ?
         *
         *  @purpose: to fetch the store role of the member
         *
         *
         */

         public function storeMemberRole($storeID, $userID) {

            $store_member = store_members::where('store_memberID', $storeID)
                                        ->where('userID', $userID)
                                        ->first();
            if($store_member) {
                return $store_member->store_role;
            } else {
                return false;
            }
        }




}

