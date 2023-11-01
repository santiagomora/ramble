<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 *
 * @property string $cat_description
 * @property int $cat_id
 *
 * @property Collection|Menu[] $menus
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'categories';
	protected $primaryKey = 'cat_id';
	public $timestamps = false;

	protected $fillable = [
		'cat_description'
	];

	public function menu(){
		return $this->hasMany(Menu::class, 'men_category');
	}

	public function shops(){
		return $this->belongsToMany(
			\App\Shop::class,
			'shops_categories',
			'sc_category_id',
			'sc_shop_id'
		);
	}

	public function extras(){
		return $this->hasMany(ExtraIngredient::class,'ext_category_id');
	}
}
