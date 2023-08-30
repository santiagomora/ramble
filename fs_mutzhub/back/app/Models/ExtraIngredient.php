<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ExtraIngredient
 *
 * @property int $ext_id
 * @property string $ext_name
 * @property string|null $ext_description
 * @property int $ext_shop
 * @property float $ext_price
 *
 * @property Shop $shop
 * @property OrdersMenuExtra $orders_menu_extra
 *
 * @package App\Models
 */
class ExtraIngredient extends Model
{
	protected $table = 'extra_ingredients';
	protected $primaryKey = 'ext_id';
	public $timestamps = false;

	protected $casts = [
		'ext_shop' => 'int',
		'ext_price' => 'float'
	];

	protected $fillable = [
		'ext_name',
		'ext_description',
		'ext_shop',
		'ext_price',
		'ext_category_id'
	];

	public function shop() {
		return $this->belongsTo(Shop::class, 'ext_shop');
	}

	public function orders_menu_extra() {
		return $this->hasOne(OrdersMenuExtra::class, 'ome_extra_id');
	}

	public function category() {
		return $this->belongsTo(Category::class, 'ext_category_id', 'cat_id');
	}
}
