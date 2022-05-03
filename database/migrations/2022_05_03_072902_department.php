<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Department extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // department table id, storeID and name
        Schema::create('department', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('storeID');
            $table->string('name');
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
        // drop department table
        Schema::dropIfExists('department');
    }
}
