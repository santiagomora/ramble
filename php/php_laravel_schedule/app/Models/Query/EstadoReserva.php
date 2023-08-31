<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class EstadoReserva
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class EstadoReserva extends Eloquent
{
	//use CrudMethods;

	protected $table = 'estado_reserva';
	public $timestamps = false;
	protected $fillable = [
		'descripcion'
	];

	public function reservas()
	{
		return $this->hasMany(\App\Models\Reserva::class, 'id_estado');
	}

}
