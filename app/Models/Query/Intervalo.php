<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
/**
 * Class UsuarioFeriado
 * 
 * @property int $id
 * @property int $id_usuario
 * @property \Carbon\Carbon $fecha_feriado
 * @property int $id_estado
 * @property \Carbon\Carbon $apertura
 * @property \Carbon\Carbon $cierre
 * 
 * @property \App\Models\EstadoApertura $estado_apertura
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Intervalo extends Eloquent
{
	use DataFormatting;

	protected static $dataKey = 'id';
	protected static $valueKey = 'description';

	public $timestamps = false;
	protected $table = 'intervalos';
	protected $fillable = [
        'descripcion'
	];
	/**
	 * start relations
	 */
	public function user(){
		return $this->hasMany(\App\User::class, 'id','intervalo_reserva');
	}
}
