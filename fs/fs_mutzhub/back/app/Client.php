<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\CustomAuthMethods;

class Client extends Authenticatable {

    use Notifiable, CustomAuthMethods;

	protected $table = 'clients';

	protected $primaryKey = 'cli_id';

    public $timestamps = false;

    protected $guard = 'clients';

    static private $tokenName = 'cli_api_token';

    static private $credentialName = 'cli_email';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cli_name',
        'cli_email',
        'cli_address',
        'cli_telephone',
        'cli_password',
        'cli_api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'cli_password',
        'cli_api_token'
    ];

    public function getAuthPassword(){
        return $this->cli_password;
    }

    public function getKeyName(){
        return $this->primaryKey;
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    public function orders() {
        return $this->hasMany(\App\Models\Order::class, 'ord_cli_id');
    }

}
