<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nombre
 * @property string $token
 * @property Cuadro[] $cuadros
 */
class Dueno extends Model
{
    public $timestamps = false;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'dueno';

    /**
     * @var array
     */
    protected $fillable = ['nombre', 'token'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cuadros()
    {
        return $this->hasMany('App\Models\Cuadro', 'id_dueno');
    }
}
