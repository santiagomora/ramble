<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {

            $table->increments('sho_id');
            $table->string('sho_email',100)->unique();
            $table->string('sho_name',50);
            $table->string('sho_address',100);
            $table->string('sho_pic',100);
            $table->unsignedInteger('sho_role_id');
            $table->string('sho_telephone',30);
            $table->unsignedInteger('sho_base_currency');
            $table->string('sho_password',255);
            $table->string('sho_description',150);
            $table->float('sho_shipping');
            $table->string('sho_api_token',255);

            $table->foreign('sho_base_currency')
                ->references('curr_id')
                ->on('currencies')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('sho_role_id')
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
        /*Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign('shops_sho_role_id_foreign');
            $table->dropForeign('shops_sho_base_currency_foreign');
        });*/
        Schema::dropIfExists('shops');
    }
}
