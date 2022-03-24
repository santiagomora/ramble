<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;

class Feriado extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = 'fecha_feriado';

	private static $valueKey = 'nombre';

	protected $relationNames = ['eventos'];

	private static $dataResource = '\\App\\Http\\Resources\\FeriadosResource';

	public $timestamps = false;

	protected $table = 'usuario_feriados';

	private static $dateParam = 'fecha_feriado';

	protected $casts = [
		'id_usuario' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
		'fecha_feriado',
		'apertura',
		'cierre'
	];

	protected $fillable = [
		'id_usuario',
		'nombre',
		'fecha_feriado',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion',
		'descripcion',
		'id_estado',
		'scope',
	];

	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
	}

	public static function validateEditAdd($request) {
		$data = $request->post();
		$user = $request->id_usuario;
		$method = $request->getMethod();
		return [
		    'id' => [
				'required_if:requestType,PUT',
				function ($attribute, $value, $fail) use ($method) {
					if($method==='POST' && $value)
						$fail('ID inválido');
		        },
				'int',
				Rule::exists('usuario_feriados','id')->where('id_usuario',$user)
			],
			'eventos' => [
				'required_if:id_estado,1',
				'array',
				Rule::exists('usuario_eventos','id')->where('id_usuario',$user)
			],
			'fecha_feriado' => [
				'required_if:requestType,POST',
				'date',
				'after:today',
				'date_format:Y-m-d',
				function ($attribute, $value, $fail) use ($user) {
					if (self::where('id_usuario',$user)->whereDate('fecha_feriado',$value)->first())
						$fail('No puedes crear dos feriados en la misma fecha');
				}
			],
			'nombre' => 'required|max:50',
			'descripcion' => 'required|max:100',
			'apertura_reserva' => 'required_if:id_estado,1',
			'apertura_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|gte:apertura_atencion.hora',
			'apertura_reserva.minuto' => [
				'required_if:id_estado,1',
				'max:59',
				'min:0',
				'int',
				function ($attribute, $value, $fail) use ($data) {
					if ($value < $data['apertura_atencion']['minuto'] && $data['apertura_reserva']['hora'] <= $data['apertura_atencion']['hora'])
					$fail('Las reservas deben abrir después que el horario de atención');
				}
			],
			'cierre_reserva' => 'required_if:id_estado,1',
			'cierre_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|lte:cierre_atencion.hora',
			'cierre_reserva.minuto' => [
				'required_if:id_estado,1',
				'max:59',
				'min:0',
				'int',
				function ($attribute, $value, $fail) use ($data) {
					if ($value > $data['cierre_atencion']['minuto'] && $data['cierre_reserva']['hora'] <= $data['cierre_atencion']['hora'])
					$fail('Las reservas deben cerrar antes que el horario de atención');
				}
			],
			'apertura_atencion' => 'required_if:id_estado,1',
			'apertura_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
			'apertura_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
			'cierre_atencion' => 'required_if:id_estado,1',
			'cierre_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
			'cierre_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
			'requestType' => 'required|in:POST,PUT',
            'id_usuario' => 'required|exists:usuarios,id',
			'id_estado' => 'required|exists:estado_apertura,id',
			'scope'	   => 'required_if:requestType,POST|exists:scope,id'
		];
	}

	public static function validateScopeUpdate($request) {
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'id' => [
				'required',
				'int',
				Rule::exists('usuario_feriados','id')->where('id_usuario',$request->post()['id_usuario'])
			],
			'scope' => [
                'required',
                'exists:scope,id',
                function ($attribute, $value, $fail) use ($request) {
                    if (count($request->post())>5)
                        $fail('Solo esta permitido cambiar el estado del feriado.');
                }
            ]
		];
	}

	public static function feriadosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function getFechaFeriadoAttribute ($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
	}

	public function getAperturaReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getAperturaAtencionAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreAtencionAttribute ($value){
		return $this->splitValue($value);
	}

	public function setAperturaReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['apertura_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setAperturaAtencionAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['apertura_atencion'] = "$hora->hora:$hora->minuto:00";
	}

	public function setCierreReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['cierre_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setCierreAtencionAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['cierre_atencion'] = "$hora->hora:$hora->minuto:00";
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}

	public function scopeName(){
		return $this->belongsTo(\App\Models\Query\Scope::class,'scope');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'feriado_eventos','id_feriado','id_evento');
	}

	public function scopeThisMonth($query,$params){
		return $query->whereMonth('fecha_feriado',$params->operator,$params->month)->whereYear('fecha_feriado',$params->operator,$params->year);
	}

	public function scopeThisDate($query,$params){
		return $query->whereDate('fecha_feriado',$params->operator,$params->date);
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public static function dataSeeding($user){
		return [
			self::class,
			5,
			true,
			$user->feriados(),
			$user->intervalo_reserva
		];
	}
}
