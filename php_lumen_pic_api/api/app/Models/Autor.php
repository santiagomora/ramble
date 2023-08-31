<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $id_pais_nacimiento
 * @property string $nombre
 * @property string $apellido
 * @property string $ano_nacimiento
 * @property string $ano_defuncion
 * @property Pai $pai
 * @property Cuadro[] $cuadros
 */
class Autor extends Model
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'autor';

    /**
     * @var array
     */
    protected $fillable = [
        'id_pais_nacimiento', 
        'nombre', 
        'ano_nacimiento', 
        'ano_defuncion'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pais()
    {
        return $this->belongsTo('App\Models\Pais', 'id_pais_nacimiento');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cuadros()
    {
        return $this->hasMany('App\Models\Cuadro', 'id_autor');
    }
}
