<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_menu', function (Blueprint $table) {

            $table->increments('om_id');
            $table->unsignedInteger('om_order_id');
            $table->unsignedInteger('om_menu_id');
            $table->unsignedInteger('om_quantity');
            $table->float('om_price');

            $table->foreign('om_order_id')
                ->references('ord_id')
                ->on('orders')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('om_menu_id')
                ->references('men_id')
                ->on('menu')
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
        /*Schema::table('orders_menu', function (Blueprint $table) {
            $table->dropForeign('orders_menu_om_order_id_foreign');
            $table->dropForeign('orders_menu_om_menu_id_foreign');
        });*/
        Schema::dropIfExists('orders_menu');
    }
}
