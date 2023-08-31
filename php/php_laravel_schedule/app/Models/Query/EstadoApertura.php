<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class EstadoApertura
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $usuario_feriados
 *
 * @package App\Models
 */
class EstadoApertura extends Eloquent
{
	//use CrudMethods;

	protected $table = 'estado_apertura';
	public $timestamps = false;
	protected $fillable = [
		'descripcion'
	];

	public function getDescripcionAttribute($value){
		return str_replace(' ','_',strtolower($value));
	}

	public function feriados()
	{
		return $this->hasMany(\App\Models\Feriado::class, 'id_estado');
	}

	public function horarios()
	{
		return $this->hasMany(\App\Models\Horario::class, 'id_estado');
	}
}
