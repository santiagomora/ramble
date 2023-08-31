<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class EstadoEvento
 *
 * @property int $id
 * @property string $descripcion
 *
 * @property \Illuminate\Database\Eloquent\Collection $usuario_eventos
 *
 * @package App\Models
 */
class Scope extends Eloquent
{
	//use CrudMethods;

	protected $table = 'scope';
	public $timestamps = false;
	protected $fillable = [
		'descripcion'
	];
}
