<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Variation
 *
 * @property int $var_id
 * @property string $var_name
 * @property string $var_description
 * @property int $var_shop_id
 * @property string $var_type
 * @property float $var_charge_EUR
 * @property float $var_price
 *
 * @property Shop $shop
 * @property OrderMenuVariation $order_menu_variation
 *
 * @package App\Models
 */
class Variation extends Model
{
	protected $table = 'variations';
	protected $primaryKey = 'var_id';
	public $timestamps = false;

	protected $casts = [
		'var_shop_id' => 'int',
		'var_charge_EUR' => 'float',
		'var_price' => 'float'
	];

	protected $fillable = [
		'var_name',
		'var_description',
		'var_shop_id',
		'var_type',
		'var_charge_EUR',
		'var_price'
	];

	public function menu(){
		return $this->belongsToMany(
			\App\Models\Variation::class,
			'menu_variation',
			'mv_variation_id',
			'mv_menu_id'
		);
	}

	public function shop(){
		return $this->belongsTo(Shop::class, 'var_shop_id');
	}

	public function order_menu_variation(){
		return $this->hasOne(OrderMenuVariation::class, 'omv_variation_id');
	}
}
