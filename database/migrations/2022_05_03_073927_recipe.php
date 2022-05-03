<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Recipe extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // id, store_id, recipe_name, catagory, recipe_image, hash, recipe_ingredient_id, recipe_allergens_id, recipe_cooking_time, recipe_steps_id, recipe_id, created_at, updated_at
        Schema::create('recipe', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('store_id');
            $table->string('recipe_name');
            $table->string('catagory');
            $table->string('recipe_image');
            $table->string('hash');
            $table->unsignedBigInteger('recipe_ingredient_id');
            $table->unsignedBigInteger('recipe_allergens_id');
            $table->unsignedBigInteger('recipe_cooking_time');
            $table->unsignedBigInteger('recipe_steps_id');
            $table->unsignedBigInteger('recipe_id');
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
        // drop recipe table
        Schema::dropIfExists('recipe');
    }
}
