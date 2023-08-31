<?php

namespace App\Http\Builder\Filter;

use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;

class RecordFilter extends BaseFilter
{
    private $rawData;

    private $data;

    public function __construct( array $rawQuery,
                                    Model $model )
    {
        parent::__construct($model);
        $this->rawData = isset($rawQuery['filterBy']) ? $rawQuery['filterBy'] : null;
        return $this->setData();
    }

    protected function setData() : BaseFilter
    {
        if(is_null($this->rawData))
        {
            return $this;
        }
        foreach( explode(',',$this->rawData) as $keyValue )
        {
            $data = explode(':',$keyValue);
            if(count($data)!=2)
            {
                throw new \Exception('Invalid query format',400);
            }
            $value = $this->setType( $data[0],$data[1] );
            $this->data[$data[0]] = $value;
        }
        return $this;
    }

    public function applyFilter( Builder $qb ) : Builder
    {
        if(!isset($this->data))
        {
            return $qb;
        }
        foreach( $this->data as $column=>$value )
        {
            $qb = $qb->where($column,$value);
        }
        return $qb;
    }

}