<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;

class Ubicacion extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

    protected $relationNames = [];

	private static $dataKey = 'id';

	private static $valueKey = 'nombre';

	private static $validation = [
		'nombre'			=> 'required|max:45|alpha_num',
		'descripcion'		=> 'required|max:50|alpha_num',
		'cantidad_maxima'	=> 'required|integer',
		'maximo_personas'	=> 'required|integer'
	];

	private static $dataResource = '\\App\\Http\\Resources\\UbicacionesResource';

	public $timestamps = false;

	protected $table = 'usuario_ubicaciones';

	protected $casts = [
		'id_usuario' => 'int',
		'cantidad_maxima' => 'int',
		'id_estado' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'foto',
		'nombre',
		'descripcion',
		'cantidad_maxima',
		'id_estado',
		'scope',
		'maximo_personas'
	];

    public static function validateEditAdd($request) {
		$user = $request->post()['id_usuario'];
		$method = $request->getMethod();
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'id' => [
			  'required_if:requestType,PUT',
			  function ($attribute, $value, $fail) use ($method) {
			      if($method==='POST' && $value)
			          $fail('ID inválido');
			  },
			  'int',
			  Rule::exists('usuario_ubicaciones','id')->where('id_usuario',$user)
			],
			'nombre'           => 'required|max:45',
			'descripcion'      => 'required|max:50',
			'cantidad_maxima' => 'required|min:1',
			'maximo_personas'  => 'required|min:1',
			'requestType' 	 => 'required|in:PUT,POST',
			'scope'		    => 'required|exists:scope,id'
		];
    }

	public static function validateScopeUpdate($request) {
		return [
			'id_usuario' => 'bail|required|exists:usuarios,id',
			'id' => [
				'required',
				'int',
				Rule::exists('usuario_ubicaciones','id')->where('id_usuario',$request->post()['id_usuario'])
			],
			'scope' => [
				'required',
				'exists:scope,id',
				function ($attribute, $value, $fail) use ($request) {
                    if (count($request->post())>5)
                        $fail('Solo esta permitido cambiar el estado de la ubicación.');
                }
			]
		];
	}

	public static function ubicacionesQueryCallback ($params) {
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\Scope::class, 'scope');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_ubicacion');
	}

	public function scopeActive($query){
		return $query->where('id_estado',1);
	}

	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			5,
			false,
			$user->ubicaciones(),
			$user->intervalo_reserva
		];
	}
}
