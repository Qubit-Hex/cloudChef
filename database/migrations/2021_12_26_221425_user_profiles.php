<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserProfiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * 
         *  @blueprint: this is a table for storing the user profiles
         * 
         *  Schema: 
         *          profile_id: the primary key
         *          storeID : the storeID of the user
         *          userID : the userID of the user
         *          name: the name of the user
         *          role: the role of the user eg ()
         *          img: the profile image of the user <url>
         *          created_at: the time the profile was created 
         *          updated_at: the time the profile was updated
         */ 

         
         Schema::create('user_profile', function (Blueprint $table) {
            $table->id('profile_id')->autoIncrement();
            $table->string('storeID');
            $table->string('userID');
            $table->string('name');
            $table->string('role');
            $table->string('img');
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
        // drop table
        Schema::dropIfExists('user_profiles');

    }
}
