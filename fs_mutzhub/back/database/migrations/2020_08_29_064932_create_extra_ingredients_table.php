<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExtraIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('extra_ingredients', function (Blueprint $table) {

            $table->increments('ext_id');
            $table->string('ext_name',50);
            $table->string('ext_description',100);
            $table->float('ext_price');
            $table->unsignedInteger('ext_shop');
            $table->unsignedInteger('ext_category_id');

            $table->foreign(['ext_shop','ext_category_id'])
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
        /*Schema::table('extra_ingredients', function (Blueprint $table) {
            $table->dropForeign('extra_ingredients_ext_shop_foreign');
            $table->dropForeign('extra_ingredients_ext_category_id_foreign');
        });*/
        Schema::dropIfExists('extra_ingredients');
    }
}
