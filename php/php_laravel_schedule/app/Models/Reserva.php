<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;

class Reserva extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

    protected $table = 'usuario_reservas';

	protected $relationNames = [];

	private static $dataKey = 'dia_reserva';

	private static $valueKey = '';

	private static $dataResource = '\\App\\Http\\Resources\\ReservaResource';

	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_ubicacion' => 'int',
		'cantidad_personas' => 'int',
		'id_evento' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
	];

	protected $fillable = [
		'id_usuario',
		'email',
		'nombre',
		'apellido',
		'telefono',
		'id_ubicacion',
		'id_promocion',
		'dia_reserva',
		'cantidad_personas',
		'id_evento',
		'descripcion_evento',
		'hora_reserva',
		'id_estado',
		'dni'
	];

	public static function validateEditAdd($request) {
		$date = self::setTimezone(date_create());
		$dateString = date_format($date,'Y-m-d H:i:s');
		$user = $request->post()['id_usuario'];
		$method = $request->getMethod();
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'dni' => 'required|max:10|numeric',
			'email' => 'email|required|max:100',
			'nombre' => 'required|max:100',
			'apellido' => 'required|max:100',
			'dia_reserva' => 'required|date|after_or_equal:today',
			'telefono' => 'required|max:20',
			'hora_reserva' => 'required',
			'hora_reserva.hora' => 'required|max:23|min:1|int',
			'hora_reserva.minuto' => 'required|max:59|min:0|int',
			'descripcion_evento' => 'required',
			'cantidad_personas' => 'required|min:1',
			'id_promocion' => [
			  'nullable',
			  'int',
			  Rule::exists('usuario_promociones','id')->where('id_usuario',$user)
			],
			'id_evento' => [
			  'required',
			  'int',
			  Rule::exists('usuario_eventos','id')->where('id_usuario',$user)
			],
			'id_ubicacion' => [
			  'required',
			  'int',
			  Rule::exists('usuario_ubicaciones','id')->where('id_usuario',$user)
			],
			'id_estado' => 'required|int|exists:estado_reserva,id',
			'requestType' => 'required|in:PUT,POST'
		];
    }

	public static function validateStatusUpdate($request) {
		$user = $request->post()['id_usuario'];
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'id' => [
				'required',
				'int',
				Rule::exists('usuario_reservas','id')->where('id_usuario',$user)
			],
			'id_estado' => [
				'required',
				'exists:estado_reserva,id',
				function ($attribute, $value, $fail) use ($request) {
                    if (count($request->post())>5)
                        $fail('Solo esta permitido cambiar el estado de la reserva.');
                }
			]
		];
	}

	public static function reservasQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeThisMonth($query,$params){
		return $query
			->whereMonth('dia_reserva',$params->operator,$params->month)
			->whereYear('dia_reserva',$params->operator,$params->year);
	}
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function getHoraReservaAttribute($value){
		$date = date_create($value);
		$date->setTime(
			$date->format("H"),
			$date->format("i"),
			'00'
		);
		return date_format($date,'H:i');
	}

	public function getDiaReservaAttribute($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
	}

	public function setHoraReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['hora_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setDiaReservaAttribute ($value) {
		$date = date_create($value);
		$this->attributes['dia_reserva'] = date_format($date,'Y-m-d');
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoReserva::class, 'id_estado');
	}

	public function evento(){
		return $this->belongsTo(\App\Models\Evento::class, 'id_evento');
	}

	public function ubicacion(){
		return $this->belongsTo(\App\Models\Ubicacion::class, 'id_ubicacion');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function promocion(){
		return $this->hasOne(\App\Models\Promocion::class, 'id','id_promocion');
	}
}
