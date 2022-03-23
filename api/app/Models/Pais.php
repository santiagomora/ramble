<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nombre
 * @property Autor[] $autors
 * @property Museo[] $museos
 */
class Pais extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['nombre'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function autores()
    {
        return $this->hasMany('App\Models\Autor', 'id_pais_nacimiento');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function museos()
    {
        return $this->hasMany('App\Models\Museo', 'id_pais');
    }
}
