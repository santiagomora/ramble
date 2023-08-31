<?php

namespace App\Http\Builder\Filter;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Http\Exceptions\ArrayException;

abstract class BaseFilter
{
    private $model;

    private $columns;

    protected $table;

    public function __construct( Model $model )
    {
        $this->table = $model->getTable();
        $this->columns = \Schema::getColumnListing( $this->table );
    }

    final protected function validateColumn( string $column ) : void
    {
        if( !in_array($column,$this->columns) )
        {
            throw new ArrayException(['msg'=>"invalid column selected: $column"],400);
        }
    }

    final protected function setType(   string $column,
                                        $value ) 
    {
        $this->validateColumn($column);
        $type = DB::getSchemaBuilder()->getColumnType($this->table, $column);
        if(!settype($value, $type))
        {
            throw new ArrayException(['msg'=>"invalid filter value $column:$value"],400);
        }
        return $value;
    }

    abstract protected function setData() : BaseFilter;

    abstract public function applyFilter( Builder $qb ) : Builder;
}