<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class Permiso
 *
 * @property int $id
 * @property string $descripcion
 *
 * @property \App\Models\RolPermiso $rol_permiso
 *
 * @package App\Models
 */
class Permiso extends Eloquent
{

	public $timestamps = false;

	protected $table = 'usuario_ubicaciones';

	public function rol_permiso()
	{
		return $this->hasOne(\App\Models\Query\Role::class, 'id_rol');
	}
}
