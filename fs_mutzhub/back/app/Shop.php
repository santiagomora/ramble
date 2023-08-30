<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAuthMethods;
use Carbon\Carbon;

 class Shop extends Authenticatable {

	use Notifiable,CustomAuthMethods;

	protected $table = 'shops';

    protected $primaryKey = 'sho_id';

    public $timestamps = false;

    protected $guard = 'shops';

    static private $tokenName = 'sho_api_token';

    static private $credentialName = 'sho_email';

	protected $casts = [
		'sho_base_currency' => 'int'
	];

	protected $dates = [
		'sho_created_at'
	];

	protected $hidden = [
		'sho_password',
		'sho_api_token'
	];

	protected $fillable = [
		'sho_name',
		'sho_email',
		'sho_password',
		'sho_created_at',
		'sho_pic',
		'sho_api_token',
		'sho_base_currency',
        'sho_role_id',
        'sho_description',
        'sho_shipping'
	];

    public function getAuthPassword(){
        return $this->sho_password;
    }

    public function getKeyName(){
        return $this->primaryKey;
    }

	public function currency() {
		return $this->belongsTo(\App\Models\Currency::class, 'sho_base_currency');
	}

	public function rol()
	{
		return $this->belongsTo(Role::class, 'sho_role_id');
	}

	public function extras() {
		return $this->hasMany(\App\Models\ExtraIngredient::class, 'ext_shop');
	}

	public function menu() {
		return $this->hasMany(\App\Models\Menu::class, 'men_shop');
	}

	public function orders() {
		return $this->hasMany(\App\Models\Order::class, 'ord_shop');
	}

	public function variations() {
		return $this->hasMany(\App\Models\Variation::class, 'var_shop_id');
	}

	public function categories(){
		return $this
            ->belongsToMany(
    			\App\Models\Category::class,
    			'shops_categories',
    			'sc_shop_id',
    			'sc_category_id'
    		)
            ->withPivot('sc_category_picture');
	}
}
