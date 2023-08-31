<?php

namespace App;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;
use App\User;

class Admin extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = "id";

	protected $table = "administradores";

	public $timestamps = false;

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\AdminsResource";

	protected $fillable = [
		"id",
		"nombre",
		"razon_social",
		"cuit_cuil",
		"telefono_contacto",
		"correo_contacto",
		"scope",
		"direccion"
	];

	public static function validateEditAdd($data){
		return [
			"nombre" => "required|max:100|string",
			"correo_contacto" => "required|email|max:100",
			"razon_social" => "required|max:100",
			"cuit_cuil" => "required|max:11",
			"telefono_contacto" => "required|max:20",
			"scope" => "required|exists:scope,id",
			"direccion" => "required|max:150",
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

	public function usuario(){
		return $this->belongsTo(\App\User::class, "id" );
	}

	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, "id_local");
	}

	public function horarios(){
		return $this->hasMany(\App\Models\Horario::class, "id_administrador");
	}

	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, "id_administrador");
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, "id_administrador");
	}

	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, "id_administrador");
	}

	public function promociones(){
		return $this->hasMany(\App\Models\Promocion::class, "id_administrador");
	}

	public function locales(){
		return $this->hasMany(\App\Local::class, "id_administrador","id");
	}

	public function franquicias(){
		return $this->hasMany(\App\Franquicia::class, "id_administrador","id");
	}
}
