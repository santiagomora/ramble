<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class DiasSemana
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $horarios_semanas
 *
 * @package App\Models
 */
class Dia extends Eloquent
{
	//use CrudMethods;
	protected $table = 'dias_semana';
	public $timestamps = false;
	protected static $keyBy = false;
	protected $fillable = [
		'descripcion'
	];

	public function horarios()
	{
		return $this->hasMany(\App\Models\Horarios::class, 'id_dia_semana');
	}
}
