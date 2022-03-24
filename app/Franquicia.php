<?php

namespace App;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;
use App\User;

class Franquicia extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = "id";

	protected $table = "franquicias";

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\FranquiciasResource";

	public $timestamps = false;

	protected $casts = [
		"scope" => "int"
	];

	protected $fillable = [
		"id",
		"nombre",
		"id_administrador",
		"razon_social",
		"id_provincia",
		"cuit_cuil",
		"direccion",
		"telefono_contacto",
		"correo_contacto",
	];

	public static function validateEditAdd($data){
		return [
			"nombre" => "required|max:100|string",
			"username"=>"required|max:100|unique:usuarios",
			"email" => "email|required|max:100|unique:usuarios",
			"password" => "required|max:191",
			"correo_contacto" => "required|email|max:100",
			"id_rol" => "required|exists:roles,id|int",
			"razon_social" => "required|max:100",
			"cuit_cuil" => "required|max:11",
			"telefono_contacto" => "required|max:20",
			"scope" => "required|int|exists:scope,id",
			"id_administrador" => [
				"required",
				"int",
				Rule::exists("usuarios","id")->where("id_rol",1),//exists amongst admins
			]
		];
	}

	public function scopeSearchId($query,$params){
		return $query->where("id",$params->id);
	}

	public static function usuariosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function usuario(){
		return $this->belongsTo(\App\User::class, "id" );
	}

	public function horarios(){
		return $this->hasMany(\App\Models\Horario::class, "id_franquicia");
	}

	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, "id_franquicia");
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, "id_franquicia");
	}

	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, "id_franquicia");
	}

	public function promociones(){
		return $this->hasMany(\App\Models\Promocion::class, "id_franquicia");
	}

	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, "id_franquicia");
	}

	public function locales(){
		return $this->hasMany(\App\Local::class, "id_franquicia","id");
	}

	public function administrador(){
		return $this->belongsTo(\App\Admin::class, "id_administrador", "id");
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\Scope::class, "scope");
	}
}
