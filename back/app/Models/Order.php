<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 *
 * @property int $ord_id
 * @property int $ord_shop
 * @property string|null $ord_observations
 * @property int $ord_cli_address
 * @property string $ord_cli_telephone
 * @property string $ord_cli_name
 * @property Carbon $ord_date
 * @property float $ord_total
 * @property int $ord_currency
 *
 * @property Shop $shop
 * @property Currency $currency
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';
	protected $primaryKey = 'ord_id';
	public $timestamps = false;

	protected $casts = [
		'ord_shop' => 'int',
		'ord_total' => 'float',
		'ord_currency' => 'int'
	];

	protected $dates = [
		'ord_date'
	];

	protected $fillable = [
		'ord_shop',
		'ord_observations',
		'ord_cli_address',
		'ord_cli_telephone',
		'ord_cli_name',
		'ord_cli_email',
		'ord_date',
		'ord_total',
		'ord_currency',
		'ord_cli_id',
		'ord_shipping',
		'ord_conversion',
		'ord_shop_currency',
		'ord_status'
	];

	public function shop(){
		return $this->belongsTo(\App\Shop::class, 'ord_shop');
	}

	public function menu(){
		return $this->hasMany(OrdersMenu::class, 'om_order_id','ord_id');
	}

	public function currency()
	{
		return $this->belongsTo(Currency::class, 'ord_currency');
	}

	public function status()
	{
		return $this->belongsTo(OrderStatus::class, 'ord_status');
	}

	public function shop_currency()
	{
		return $this->belongsTo(Currency::class, 'ord_shop_currency');
	}

	static public function cast($data){
		$shop =  $data['shop'];
		$client = $data['client'];
        return [
			"ord_cli_id" => isset($client["ord_cli_id"])
							? $client["ord_cli_id"]
							: null,
            "ord_shop" => $shop["id"],
            "ord_observations" => $client["ord_observations"],
    		'ord_cli_address' => $client['ord_cli_address'],
    		'ord_cli_telephone' => $client['ord_cli_telephone'],
            'ord_cli_email' => $client['ord_cli_email'],
    		'ord_cli_name' => $client['ord_cli_name'],
    		'ord_date' => Carbon::now(),
    		'ord_total' => $data['total'],
    		'ord_currency' => $data['currency'],
			'ord_shipping' => $data['shipping'],
			'ord_conversion' => $data['conversion'],
			'ord_shop_currency' => $shop['currency']
        ];
    }
}
