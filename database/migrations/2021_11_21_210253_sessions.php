<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Sessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //create table for storing user sessions in the database 

        Schema::create('sessions', function (Blueprint $table) {
            $table->id('sessionID')->autoIncrement();
            $table->unsignedInteger('user_ID')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->text('token'); // JWT TOKEN THE USER 
            $table->text('signature'); 
            // this is store the signature of the token so we can verify it 
            $table->timestamp('session_expiry');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // drop table for storing user sessions in the database
        Schema::dropIfExists('sessions');
    }
}
