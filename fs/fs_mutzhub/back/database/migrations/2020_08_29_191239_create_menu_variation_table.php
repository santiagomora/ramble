<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuVariationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_variation', function (Blueprint $table) {

            $table->unsignedInteger('mv_menu_id');
            $table->unsignedInteger('mv_variation_id');

            $table->foreign('mv_menu_id')
                ->references('men_id')
                ->on('menu')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('mv_variation_id')
                ->references('var_id')
                ->on('variations')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('menu_variation', function (Blueprint $table) {
            $table->dropForeign('menu_variation_mv_menu_id_foreign');
            $table->dropForeign('menu_variation_mv_variation_id_foreign');
        });*/
        Schema::dropIfExists('menu_variation');
    }
}
