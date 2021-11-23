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
        /**
         *  @purpose: the purpose of this table is create a store table.
         * 
         *  api:   /store/
         * 
         */
        // make a store table for the restaurant 
        Schema::create('store', function (Blueprint $table) {
            $table->id('storeID')->autoIncrement();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('signature_token')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // drop the store of the table
        Schema::dropIfExists('store');
    }
}
