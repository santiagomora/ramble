<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 * 
 * @property int $rol_id
 * @property string $rol_description
 * 
 * @property Collection|Shop[] $shops
 *
 * @package App\Models
 */
class Role extends Model
{
	protected $table = 'roles';
	protected $primaryKey = 'rol_id';
	public $timestamps = false;

	protected $fillable = [
		'rol_description'
	];

	public function shops()
	{
		return $this->hasMany(Shop::class, 'sho_role_id');
	}
}
