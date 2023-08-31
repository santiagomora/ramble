<?php

namespace App\Http\Builder\Filter;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class ColumnFilter extends BaseFilter
{
    private $rawData;

    private $data= [];

    public function __construct(    array $rawQuery,
                                    Model $model )
    {
        parent::__construct($model);
        $this->rawData = isset($rawQuery['columns']) ? $rawQuery['columns'] : null;
        return $this->setData();
    }

    protected function setData() : BaseFilter
    {
        if(is_null($this->rawData))
        {
            return $this;
        }
        foreach( explode(',',$this->rawData) as $col )
        {
            $this->validateColumn($col);
            array_push($this->data,$col);
        }
        return $this;
    }

    public function applyFilter( Builder $qb ) : Builder
    {
        if(!isset($this->data))
        {
            return $qb;
        }
        return $qb->select($this->data);
    }
}