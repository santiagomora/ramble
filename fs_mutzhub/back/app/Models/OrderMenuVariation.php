<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderMenuVariation
 *
 * @property int $omv_order_menu_id
 * @property int $omv_variation_id
 *
 * @property OrdersMenu $orders_menu
 * @property Variation $variation
 *
 * @package App\Models
 */
class OrderMenuVariation extends Model
{
	protected $table = 'orders_menu_variation';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'omv_order_menu_id' => 'int',
		'omv_variation_id' => 'int'
	];

	protected $fillable = [
		'omv_order_menu_id',
		'omv_variation_id'
	];

	public function orders_menu()
	{
		return $this->belongsTo(OrdersMenu::class, 'omv_order_menu_id');
	}

	public function variation()
	{
		return $this->belongsTo(Variation::class, 'omv_variation_id');
	}

	static public function cast($men,$var){
		return [
			'omv_order_menu_id' => $men,
			'omv_variation_id' => $var
		];
	}
}
