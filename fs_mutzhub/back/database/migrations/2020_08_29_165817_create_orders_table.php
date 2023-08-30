<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {

            $table->increments('ord_id');
            $table->unsignedInteger('ord_shop');
            $table->datetime('ord_date');
            $table->string('ord_cli_address',100);
            $table->string('ord_cli_telephone',30);
            $table->string('ord_cli_name',50);
            $table->string('ord_cli_email',80);
            $table->unsignedInteger('ord_cli_id')->nullable();
            $table->string('ord_observations',250)->nullable();
            $table->unsignedInteger('ord_currency');
            $table->unsignedInteger('ord_shop_currency');
            $table->float('ord_shipping');
            $table->float('ord_conversion');
            $table->float('ord_total');
            $table->unsignedInteger('ord_status')->default(1);

            $table->foreign('ord_shop')
                ->references('sho_id')
                ->on('shops')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('ord_status')
                ->references('sta_id')
                ->on('order_status')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('ord_cli_id')
                ->references('cli_id')
                ->on('clients')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('ord_shop_currency')
                ->references('curr_id')
                ->on('currencies')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('ord_currency')
                ->references('curr_id')
                ->on('currencies')
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
        /*Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign('orders_ord_shop_foreign');
            $table->dropForeign('orders_ord_cli_id_foreign');
            $table->dropForeign('orders_ord_status_foreign');
            $table->dropForeign('orders_ord_shop_currency_foreign');
            $table->dropForeign('orders_ord_currency_foreign');
        });*/

        Schema::dropIfExists('orders');
    }
}
