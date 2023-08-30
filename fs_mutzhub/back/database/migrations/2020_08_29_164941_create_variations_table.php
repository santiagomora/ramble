<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::create('variations', function (Blueprint $table) {

            $table->increments('var_id');
            $table->string('var_name',20);
            $table->string('var_description',100);
            $table->string('var_type',20);
            $table->unsignedInteger('var_shop_id');
            $table->float('var_price');

            $table->foreign('var_shop_id')
                ->references('sho_id')
                ->on('shops')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {

        /*Schema::table('variations', function (Blueprint $table) {
            $table->dropForeign('variations_var_shop_id_foreign');
        });*/

        Schema::dropIfExists('variations');

    }
}
