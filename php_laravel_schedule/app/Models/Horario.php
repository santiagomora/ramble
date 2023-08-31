<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

class Horario extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = 'id_dia_semana';

	private static $valueKey = 'id';

	private static $dataResource = '\\App\\Http\\Resources\\HorarioResource';

	protected $relationNames = ['eventos'];

	protected $table = 'usuario_horarios';

	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_dia_semana' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'id_dia_semana',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion',
		'id_estado'
	];

	public static function validateEditAdd($request) {
		$data = $request->post();
		$method = $request->getMethod();
		$user = $data['id_usuario'];
		return [
		    'id' => [
				'required_if:requestType,PUT',
				function ($attribute, $value, $fail) use ($method) {
					if($method==='POST' && $value)
						$fail('ID inválido');
		        },
				'int',
				Rule::exists('usuario_horarios','id')->where('id_usuario',$user)
			],
			'id_dia_semana' => [
				'required_if:requestType,POST',
				'int',
				'exists:dias_semana,id',
				Rule::notIn(self::where('id_usuario',$user)->pluck('id_dia_semana'))
			],
			'eventos' => [
				'required_if:id_estado,1',
				'array',
				Rule::exists('usuario_eventos','id')->where('id_usuario',$user)
			],
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
			'apertura_reserva' => 'required_if:id_estado,1',
			'apertura_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|gte:apertura_atencion.hora',
			'cierre_reserva' => 'required_if:id_estado,1',
			'cierre_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|lte:cierre_atencion.hora',
			'apertura_atencion' => 'required_if:id_estado,1',
			'apertura_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
			'apertura_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
			'cierre_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
			'cierre_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
			'cierre_atencion' => 'required_if:id_estado,1',
			'requestType' => 'required|in:POST,PUT',
            'id_usuario' => 'required|exists:usuarios,id',
			'id_estado' => 'required|exists:estado_apertura,id'
		];
	}

	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
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

	public static function horariosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function dias_semana(){
		return $this->belongsTo(\App\Models\Query\Semana::class, 'id_dia_semana');
	}

	public function user(){
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}

	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'horario_eventos','id_horario','id_evento');
	}

	public static function dataSeeding($user){
		return [
			self::class,
			7,
			true,
			$user->horariosSemanas(),
			$user->intervalo_reserva
		];
	}

}
