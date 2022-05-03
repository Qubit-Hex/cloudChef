<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Store extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // storeID, name, email, signature_token
        Schema::create('store', function (Blueprint $table) {
            $table->bigIncrements('storeID');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('signature_token');
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
        //
        Schema::dropIfExists('store');
    }
}
