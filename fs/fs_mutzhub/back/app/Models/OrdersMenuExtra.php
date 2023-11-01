<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrdersMenuExtra
 *
 * @property int $ome_order_menu_id
 * @property int $ome_extra_id
 *
 * @property OrdersMenu $orders_menu
 * @property ExtraIngredient $extra_ingredient
 *
 * @package App\Models
 */
class OrdersMenuExtra extends Model
{
	protected $table = 'orders_menu_extra';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'ome_order_menu_id' => 'int',
		'ome_extra_id' => 'int'
	];

	protected $fillable = [
		'ome_order_menu_id',
		'ome_extra_id'
	];

	public function orders_menu()
	{
		return $this->belongsTo(OrdersMenu::class, 'ome_order_menu_id');
	}

	public function extra_ingredient()
	{
		return $this->belongsTo(ExtraIngredient::class, 'ome_extra_id');
	}

	static public function cast($men,$ext){
		return [
			'ome_order_menu_id' => $men,
			'ome_extra_id' => $ext
		];
	}
}
