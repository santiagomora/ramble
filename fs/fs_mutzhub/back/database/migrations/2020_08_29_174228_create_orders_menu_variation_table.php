<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersMenuVariationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_menu_variation', function (Blueprint $table) {

            $table->unsignedInteger('omv_order_menu_id');
            $table->unsignedInteger('omv_variation_id');

            $table->foreign('omv_order_menu_id')
                ->references('om_id')
                ->on('orders_menu')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('omv_variation_id')
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
        /*Schema::table('orders_menu_variation', function (Blueprint $table) {
            $table->dropForeign('orders_menu_variation_omv_order_menu_id_foreign');
            $table->dropForeign('orders_menu_variation_omv_variation_id_foreign');
        });*/
        Schema::dropIfExists('orders_menu_variation');
    }
}
