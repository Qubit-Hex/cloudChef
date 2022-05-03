<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Employee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // id, userID, storeID, department_id, first_name, last_name, address, location, email, phone, salary, is_active, start_date, end_date

        Schema::create('employee', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('userID');
            $table->unsignedBigInteger('storeID');
            $table->unsignedBigInteger('department_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('location');
            $table->string('email');
            $table->string('phone');
            $table->string('salary');
            $table->boolean('is_active');
            $table->date('start_date');
            $table->date('end_date')->nullable();
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
        // drop employee table
        Schema::dropIfExists('employee');
    }
}
