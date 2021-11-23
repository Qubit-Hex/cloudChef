<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StoreMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // create a database table for the members of a specific store its works similar to a group table

        /**
         *   @purpose: the purpose this is table is to store the memebers of a store but seperate the creatations of these virtual users 
         *  from the actual users off the website.  Some imaginary users may be created for the store but they are not actual users.
         * 
         *  API:    /store/{STOREKEY]/members
         *
         */
        Schema::create('store_members', function (Blueprint $table) {
            $table->id('store_memberID')->autoIncrement();
            $table->uuid('storeID');
            $table->uuid('userID');
            $table->string('store_role');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // drop the store_members table
        Schema::dropIfExists('store_members');
    }
}
