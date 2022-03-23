<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $id_pais
 * @property string $nombre
 * @property Pai $pai
 * @property Cuadro[] $cuadros
 */
class Museo extends Model
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'museo';

    /**
     * @var array
     */
    protected $fillable = ['nombre'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cuadros()
    {
        return $this->hasMany('App\Models\Cuadro', 'id_museo');
    }
}
