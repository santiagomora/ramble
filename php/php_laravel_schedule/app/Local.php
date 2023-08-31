<?php

namespace App;
use App\User;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Local extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = "id";

	protected $table = "locales";

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\LocalesResource";

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
		"id",
		"nombre",
		"id_administrador",
		"id_franquicia",
		"razon_social",
		"id_provincia",
		"intervalo_reserva",
		"correo_adm",
		"telefono_adm",
		"nombre_adm",
		"caida_reserva",
		"cuit_cuil",
		"direccion",
		"telefono_contacto",
		"correo_contacto",
		"antelacion_reserva",
		"disponibilidad_reserva"
	];

	public static function validateReservas($data) {
		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:usuarios,id',
			"intervalo_reserva" => "required|int|max:60|min:1|exists:intervalos,id",
			"antelacion_reserva" => "required|int|min:0|int",
			"disponibilidad_reserva" => "required|min:0|int",
			"caida_reserva" => "min:10|max:60|required|int"
		];
	}

	public static function validateEstablecimiento($data) {
		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:usuarios,id',
			"nombre" => "required|max:100|string",
			"correo_contacto" => "required|email|max:100",
			"telefono_contacto" => "required|max:20",
			"razon_social" => "required|max:100",
			"cuit_cuil" => "required|max:11",
			"nombre_adm" => "required|max:100",
			"telefono_adm" => "required|max:20",
			"correo_adm" => "required|max:100|email",
			"id_provincia" => "required|int|exists:provincias,id",
			"direccion_local" => "required|max:150"
		];
	}

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
			],
			"id_franquicia" => [
				"required_if:id_rol,3", // si creo un local necesito la franquicia,
				"int",
				Rule::exists("usuarios","id")->where("id_rol",2), //exists amongst admins,
			]
		];
	}

	public function getRelationNames(){
      	return $this->relationNames;
    }

	public function scopeSearchId($query,$params){
		return $query->where("id",$params->id);
	}

	public static function usuariosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, "id_local");
	}

	public function horarios(){
		return $this->hasMany(\App\Models\Horario::class, "id_local");
	}

	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, "id_local");
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, "id_local");
	}

	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, "id_local");
	}

	public function promociones(){
		return $this->hasMany(\App\Models\Promocion::class, "id_local");
	}

	public function intervalo(){
		return $this->belongsTo(\App\Models\Query\Intervalo::class, "intervalo_reserva");
	}

	public function provincia(){
		return $this->belongsTo(\App\Models\Query\Provincia::class, "id_provincia");
	}

	public function usuario(){
		return $this->belongsTo(\App\User::class, "id" );
	}

	public function franquicia(){
		return $this->belongsTo(\App\Franquicia::class, "id_franquicia","id");
	}

	public function administrador(){
		return $this->belongsTo(\App\Admin::class, "id_administrador", "id");
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\Scope::class, "scope");
	}
}
