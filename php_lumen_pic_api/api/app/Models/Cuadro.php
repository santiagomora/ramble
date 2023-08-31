<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Interfaces\HasValidation;

/**
 * @property int $id
 * @property int $id_dueno
 * @property int $id_autor
 * @property int $id_corriente
 * @property int $id_museo
 * @property string $titulo
 * @property string $fecha
 * @property string $descripcion
 * @property Museo $museo
 * @property Autor $autor
 * @property Dueno $dueno
 * @property Corriente $corriente
 */
class Cuadro extends Model implements HasValidation
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'cuadro';

    /**
     * @var array
     */
    protected $fillable = [
        'id_dueno', 
        'id_autor', 
        'id_corriente', 
        'id_museo', 
        'titulo', 
        'fecha', 
        'descripcion'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function museo()
    {
        return $this->belongsTo('App\Models\Museo', 'id_museo');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function autor()
    {
        return $this->belongsTo('App\Models\Autor', 'id_autor');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dueno()
    {
        return $this->belongsTo('App\Models\Dueno', 'id_dueno');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function corriente()
    {
        return $this->belongsTo('App\Models\Corriente', 'id_corriente');
    }

    public function getValidation() : array
    {
        return [
            'id_dueno' => 'required|exists:dueno,id', 
            'id_autor' => 'required|exists:autor,id', 
            'id_corriente' => 'required|exists:corriente,id', 
            'id_museo' => 'required|exists:museo,id', 
            'titulo'  => 'required|max:255', 
            'fecha'=> 'required|max:20',  
            'descripcion'=> 'required|max:255'
        ];
    }
}
