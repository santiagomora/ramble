<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuadroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cuadro', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo');
            $table->string('fecha',20);
            $table->string('descripcion');
            $table->unsignedInteger('id_dueno')->index('FK_CuadroDueno');
            $table->unsignedInteger('id_autor')->index('FK_CuadroAutor');
            $table->unsignedInteger('id_corriente')->index('FK_CuadroCorriente');
            $table->unsignedInteger('id_museo')->nullable()->index('FK_CuadroMuseo');
            $table->unique(['titulo', 'id_autor'], 'UN_AutorTitulo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuadro');
    }
}
