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
class OrderStatus extends Model
{
	protected $table = 'order_status';
	protected $primaryKey = 'sta_id';
	public $timestamps = false;

	protected $fillable = [
		'sta_name'
	];

	public function orders()
	{
		return $this->hasMany(Order::class, 'ord_currency');
	}
}
