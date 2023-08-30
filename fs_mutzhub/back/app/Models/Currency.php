<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Currency
 * 
 * @property int $curr_id
 * @property string $curr_name
 * 
 * @property Collection|Order[] $orders
 * @property Collection|OrdersMenu[] $orders_menus
 * @property Collection|Shop[] $shops
 *
 * @package App\Models
 */
class Currency extends Model
{
	protected $table = 'currencies';
	protected $primaryKey = 'curr_id';
	public $timestamps = false;

	protected $fillable = [
		'curr_name'
	];

	public function orders()
	{
		return $this->hasMany(Order::class, 'ord_currency');
	}

	public function orders_menus()
	{
		return $this->hasMany(OrdersMenu::class, 'om_currency');
	}

	public function shops()
	{
		return $this->hasMany(Shop::class, 'sho_base_currency');
	}
}
