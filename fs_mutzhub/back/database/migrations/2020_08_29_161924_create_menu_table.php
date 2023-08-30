<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){

        Schema::create('menu', function (Blueprint $table) {

            $table->increments('men_id');
            $table->string('men_name',50);
            $table->unsignedInteger('men_shop');
            $table->string('men_description',100);
            $table->string('men_picture',250);
            $table->unsignedInteger('men_category');
            $table->float('men_base_price');

            $table->foreign(['men_shop','men_category'])
                ->references(['sc_shop_id','sc_category_id'])
                ->on('shops_categories')
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

        /*Schema::table('menu', function (Blueprint $table) {
            $table->dropForeign('menu_men_category_foreign');
            $table->dropForeign('menu_men_shop_foreign');
        });*/

        Schema::dropIfExists('menu');

    }
}
