<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersMenuExtraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_menu_extra', function (Blueprint $table) {

            $table->unsignedInteger('ome_order_menu_id');
            $table->unsignedInteger('ome_extra_id');

            $table->foreign('ome_order_menu_id')
                ->references('om_id')
                ->on('orders_menu')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('ome_extra_id')
                ->references('ext_id')
                ->on('extra_ingredients')
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
        /*Schema::table('orders_menu_extra', function (Blueprint $table) {
            $table->dropForeign('orders_menu_extra_ome_order_menu_id_foreign');
            $table->dropForeign('orders_menu_extra_ome_extra_id_foreign');
        });*/
        Schema::dropIfExists('orders_menu_extra');
    }
}
