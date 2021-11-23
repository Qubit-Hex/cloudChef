<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserRegistrationLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // this is a table for recording user registration activity

        Schema::create('user_registration_log', function (Blueprint $table) {
            $table->id('log_number')->autoIncrement();
            $table->string('user_agent');
            $table->string('ip_address');
            $table->bigInteger('counter');
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
        Schema::dropIfExists('user_registration_log');
    }
}
