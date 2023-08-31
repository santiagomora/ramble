<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;


class Evento extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	protected $relationNames = [
		'feriados',
		'horarios',
		'promociones'
	];

	private static $dataKey = 'id';

	private static $valueKey = 'nombre';

	private static $dataResource = '\\App\\Http\\Resources\\EventosResource';

	protected $table = 'usuario_eventos';

	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'descuento' => 'int',
		'id_estado' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'nombre',
		'descripcion',
		'scope'
	];

	public static function validateEditAdd($request) {
		$method = $request->getMethod();
		$user = $request->post()['id_usuario'];
		return [
		    'id' => [
				'required_if:requestType,PUT',
				function ($attribute, $value, $fail) use ($method) {
					if($method==='POST' && $value)
						$fail('ID inválido');
		        },
				'int',
				Rule::exists('usuario_eventos','id')->where('id_usuario',$user)
			],
		    'promociones' => [
				'array',
				'nullable',
				Rule::exists('usuario_promociones','id')->where('id_usuario', $user)
			],
			'horarios' => [
				'array',
				'required_if:requestType,POST',
				Rule::exists('usuario_horarios','id')->where('id_usuario', $user)
			],
			'feriados' => [
				'array',
				'nullable',
				Rule::exists('usuario_feriados','id')->where('id_usuario', $user)
			],
			'feriados.*' 	=> 'int',
			'horarios.*' 	=> 'int',
			'promociones.*' => 'int',
		    'descripcion' 	=> 'required|max:100|string',
		    'nombre'		=> 'required|max:45|string',
			'requestType' 	=> 'required|in:POST,PUT',
            'id_usuario' 	=> 'required|exists:usuarios,id',
			'scope' 	=> 'required|exists:scope,id'
		];
	}

	public static function validateScopeUpdate($request) {
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'id' => [
				'required',
				'int',
				Rule::exists('usuario_eventos','id')->where('id_usuario',$request->post()['id_usuario'])
			],
			'scope' => [
                'required',
                'exists:scope,id',
                function ($attribute, $value, $fail) use ($request) {
                    if (count($request->post())>5)
                        $fail('Solo esta permitido cambiar el estado del evento.');
                }
            ]
		];
	}

	public static function eventosQueryCallback ($params) {
		return function ($query) use ($params){
			return $query->{$params->scope}($params);
		};
	}

	public function estado(){
		return $this->belongsTo(
			\App\Models\Query\Scope::class,
			'scope'
		);
	}

	public function user(){
		return $this->belongsTo(
			\App\User::class,
			'id_usuario'
		);
	}

	public function horario(){
		return $this->hasMany(
			\App\Models\Query\HorarioEvento::class,
			'id_evento'
		);
	}

	public function promociones(){
		return $this->belongsToMany(
			\App\Models\Promocion::class,
			'eventos_promociones',
			'id_evento',
			'id_promocion'
		)->withPivot(
			'inicio_promocion',
			'fin_promocion'
		);
	}

	public function horarios(){
		return $this->belongsToMany(
			\App\Models\Horario::class,
			'horario_eventos',
			'id_evento',
			'id_horario'
		);
	}

	public function feriados(){
		return $this->belongsToMany(
			\App\Models\Feriado::class,
			'feriado_eventos',
			'id_evento',
			'id_feriado'
		);
	}

	public function scopeActive($query){
		return $query->where('id_estado',1);
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			8,
			false,
			$user->eventos(),
			$user->intervalo_reserva
		];
	}

}
