<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops_categories', function (Blueprint $table) {
            $table->unsignedInteger('sc_shop_id');
            $table->unsignedInteger('sc_category_id');
            $table->string('sc_category_picture',100);
            $table->primary(['sc_shop_id','sc_category_id']);

            $table->foreign('sc_shop_id')
                ->references('sho_id')
                ->on('shops')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('sc_category_id')
                ->references('cat_id')
                ->on('categories')
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
        /*Schema::table('shops_categories', function (Blueprint $table) {
            $table->dropForeign('shops_categories_sc_category_id_foreign');
            $table->dropForeign('shops_categories_sc_shop_id_foreign');
        });*/
        Schema::dropIfExists('shops_categories');
    }
}
