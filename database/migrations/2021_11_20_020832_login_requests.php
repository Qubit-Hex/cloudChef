<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LoginRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        // create a table inorder to record the login attempts / requests 
        Schema::create('login_requests', function (Blueprint $table) {
            $table->id('id')->autoIngerment();
            $table->string('email');
            $table->string('ip_address');
            $table->string('user_agent');
            $table->time('request_time');
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
        Schema::dropIfExists('login_requests');
    }
}
