<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrdersMenu
 *
 * @property int $om_shop_id
 * @property int $om_menu_id
 * @property int $om_variation_id
 * @property int $om_id
 * @property int $om_quantity
 * @property float $om_price
 * @property int $om_currency
 *
 * @property Currency $currency
 * @property OrderMenuVariation $order_menu_variation
 * @property OrdersMenuExtra $orders_menu_extra
 *
 * @package App\Models
 */
class OrdersMenu extends Model
{
	protected $table = 'orders_menu';
	protected $primaryKey = 'om_id';
	public $timestamps = false;

	protected $casts = [
		'om_shop_id' => 'int',
		'om_menu_id' => 'int',
		'om_variation_id' => 'int',
		'om_quantity' => 'int',
		'om_price' => 'float',
		'om_currency' => 'int'
	];

	protected $fillable = [
		'om_order_id',
		'om_menu_id',
		'om_quantity',
		'om_price'
	];

	public function currency() {
		return $this->belongsTo(Currency::class, 'om_currency');
	}

	public function menu() {
		return $this->belongsTo(Menu::class, 'om_menu_id');
	}

	public function variations(){
		return $this->belongsToMany(
			\App\Models\Variation::class,
			'orders_menu_variation',
			'omv_order_menu_id',
			'omv_variation_id'
		);
	}

	public function extras(){
		return $this->belongsToMany(
			\App\Models\ExtraIngredient::class,
			'orders_menu_extra',
			'ome_order_menu_id',
			'ome_extra_id'
		);
	}

	static public function cast($data,$order_id){
		$item = $data['item'];
		return [
			'om_order_id' => $order_id,
			'om_menu_id' => $item["data"]['id'],
			'om_quantity' => $data['quantity'],
			'om_price' => $item["data"]['base_price']
		];
	}
}
