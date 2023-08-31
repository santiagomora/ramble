<?php

namespace App;

use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {

	use DataFormatting, ValidationMessages;

	private static $dataKey = "id";

	protected $table = "usuarios";

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\UsuariosResource";

	public $timestamps = false;

	protected $casts = [
		"id_franquicia" => "int",
		"id_provincia" => "int",
		"id_rol" => "int",
		"scope" => "int"
	];

	protected $dates = [
		"email_verified_at"
	];

	protected $hidden = [
		"password",
		"remember_token"
	];

	protected $fillable = [
		"email",
		"password",
		"api_token",
		"foto_perfil",
		"remember_token",
		"id_rol",
		"created_at",
		"email_verified_at",
		"scope",
		"username"
	];

	public static function validateUsuario($data) {
		$user = self::findOrFail($data->id);
 		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:administradores,id',
			"username"=>[
				"required",
				"max:100",
				Rule::unique('usuarios')->ignore($user->username,'username')
			],
			"email" => [
				"email",
				"required",
				"max:100",
				Rule::unique('usuarios')->ignore($user->email,'email')
			],
			"password" => "max:100|string"
		];
	}

	public function permisos(){
		return $this->belongsTo(\App\Models\Permiso::class, "id_rol");
	}

	public function Franquicia(){
		return $this->hasOne(\App\Franquicia::class,"id");
	}

	public function Local(){
		return $this->hasOne(\App\Local::class,"id");
	}

	public function Admin(){
		return $this->hasOne(\App\Admin::class,"id");
	}

	public function rol(){
		return $this->hasOne(\App\Models\Query\Role::class,"id","id_rol");
	}
}
