<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Users extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // create a table for the users

        /**
         *  @purpose: the purpose of this table is to store the users of the website.
         * 
         *  api:   /users/
         * 
         */
    
     
        Schema::create('users', function (Blueprint $table) {
            $table->id('userID')->autoIncrement();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('salt', 128);
            $table->rememberToken()->nullable();
            $table->string('digital_access_tokens')->nullable(); 
            // this certificate is used to verify the user owners ship in  a store
            // image this as a key to physical store and not as a password
            /**
             *  example:
             *
             *  { 
             *             storeID: {
             *                "token": "accessToken", // this is the access token THIS ACTS AS A KEY TO ACCESS A SPECIFIC STRE API 
             *            }
             *  }
             * 
             */
            $table->timestamps();
            // this will include the status of the user account.
            $table->boolean('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('users');
    }
}
