<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nombre
 * @property string $descripcion
 * @property Cuadro[] $cuadros
 */
class Corriente extends Model
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'corriente';

    /**
     * @var array
     */
    protected $fillable = ['nombre', 'descripcion'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cuadros()
    {
        return $this->hasMany('App\Models\Cuadro', 'id_corriente');
    }
}
