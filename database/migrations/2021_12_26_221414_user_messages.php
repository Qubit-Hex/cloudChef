<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserMessages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         *  @blueprint: this is a table for storing the user messages
         *  
         *   @schema: 
         *          mesage_id: the primary key
         *          storeID : the storeID of the user
         *          userID : the userID of the user
         *          message: the message of the user
         *          created_at: the time the message was created
         * 
         */

        Schema::create('user_messages', function (Blueprint $table) {
            $table->id('message_id')->autoIncrement();
            $table->integer('storeID');
            $table->integer('userID');
            $table->integer('groupID');
            $table->text('message');
            $table->dateTime('time', $precision = 0)->nullable();
            $table->boolean('read');

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
        Schema::dropIfExists('user_messages');
    }
}
