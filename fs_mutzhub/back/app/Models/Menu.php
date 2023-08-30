<?php

/**
 * Created by Reliese Model.
 */


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Menu
 *
 * @property int $men_id
 * @property int $men_shop
 * @property string $men_name
 * @property string $men_description
 * @property string $men_picture
 * @property int $men_category
 * @property float $men_base_price
 *
 * @property Shop $shop
 * @property Category $category
 *
 * @package App\Models
 */
class Menu extends Model
{
	protected $table = 'menu';
	protected $primaryKey = 'men_id';
	public $timestamps = false;

	protected $casts = [
		'men_shop' => 'int',
		'men_category' => 'int',
		'men_base_price' => 'float'
	];

	protected $fillable = [
		'men_shop',
		'men_name',
		'men_description',
		'men_picture',
		'men_category',
		'men_base_price'
	];

	public function shop()
	{
		return $this->belongsTo(\App\Shop::class, 'men_shop');
	}

	public function orders(){
		return $this->hasMany(OrdersMenu::class, 'om_menu_id','men_id');
	}

	public function variations(){
		return $this->belongsToMany(
			\App\Models\Variation::class,
			'menu_variation',
			'mv_menu_id',
			'mv_variation_id'
		);
	}

	public function category(){
		return $this->belongsTo(Category::class, 'men_category');
	}

}
