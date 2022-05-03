<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserFingerprint extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // id, userIP, userAgent, time, requestData, requestType, signature, sessionToken,  created_at, updated_at
        Schema::create('user_fingerprint', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('userIP');
            $table->string('userAgent');
            $table->string('time');
            $table->string('requestData');
            $table->string('requestType');
            $table->string('signature');
            $table->string('sessionToken');
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
        Schema::dropIfExists('user_fingerprint');
    }
}
