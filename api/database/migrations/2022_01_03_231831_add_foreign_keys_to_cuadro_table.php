<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToCuadroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cuadro', function (Blueprint $table) {
            $table->foreign(['id_autor'], 'FK_CuadroAutor')->references(['id'])->on('autor');
            $table->foreign(['id_dueno'], 'FK_CuadroDueno')->references(['id'])->on('dueno');
            $table->foreign(['id_corriente'], 'FK_CuadroCorriente')->references(['id'])->on('corriente');
            $table->foreign(['id_museo'], 'FK_CuadroMuseo')->references(['id'])->on('museo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cuadro', function (Blueprint $table) {
            $table->dropForeign('FK_CuadroAutor');
            $table->dropForeign('FK_CuadroDueno');
            $table->dropForeign('FK_CuadroCorriente');
            $table->dropForeign('FK_CuadroMuseo');
        });
    }
}
