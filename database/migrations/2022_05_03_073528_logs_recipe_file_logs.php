<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LogsRecipeFileLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // id, honeypot_hash, file_hash, file_path, time_stamp, verified, message, created_at, updated_at
        Schema::create('logs_recipe_file_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('honeypot_hash');
            $table->string('file_hash');
            $table->string('file_path');
            $table->timestamp('time_stamp');
            $table->boolean('verified');
            $table->string('message');
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
        // drop logs_recipe_file_logs table
        Schema::dropIfExists('logs_recipe_file_logs');
    }
}
