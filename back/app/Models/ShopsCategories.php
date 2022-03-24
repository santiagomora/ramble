<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopsCategories extends Model
{
	protected $table = 'shops_categories';
	protected $primaryKey = ['sc_shop_id','sc_category_id'];

    public $timestamps = false;

	protected $casts = [
		'sc_shop_id' => 'int',
		'sc_category_id' => 'int'
	];

	protected $fillable = [
        'sc_shop_id',
        'sc_category_id',
        'sc_category_picture'
	];

}
