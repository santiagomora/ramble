<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('cli_id');
            $table->string('cli_name',50);
            $table->string('cli_address',100);
            $table->string('cli_telephone',30);
            $table->string('cli_email',80)->unique();
            $table->string('cli_password',255);
            $table->string('cli_api_token',255);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
