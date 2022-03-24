<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Role
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \App\Models\RolPermiso $rol_permiso
 *
 * @package App\Models
 */
class Role extends Eloquent
{

	public $timestamps = false;
	protected $table = 'roles';
	protected $fillable = [
		'descripcion'
	];
	public function rol_permiso()
	{
		return $this->hasOne(\App\Models\RolPermiso::class, 'id_rol');
	}
}
