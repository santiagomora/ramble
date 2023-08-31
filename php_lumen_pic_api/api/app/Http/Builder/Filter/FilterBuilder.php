<?php

namespace App\Http\Builder\Filter;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class FilterBuilder
{
    private $rawResults = [];

    private $model;

    public function __construct( string $model )
    {
        $this->model = $model;
        return $this;
    }

    private function cast() : array
    {
        $casted = [];
        $model = $this->model;
        foreach( $this->rawResults as $raw )
        {
            array_push( $casted, new $model( (array) $raw ) );
        }
        return $casted;
    }

    public function clean() : void
    {
        $this->model = null;
        $this->rawResults = [];
        $this->castedResults = [];
    }

    public function build( array $filters,
                            array $extraQuery ) : FilterBuilder
    {
        $qb = DB::table( (new $this->model)->getTable() );
        foreach( $filters as $fil )
        {
            $qb = $fil->applyFilter($qb);
        }
        $qb = $qb->where($extraQuery);
        $this->rawResults = $qb->get();
        return $this;
    }

    public function storeRaw( array &$to ) : FilterBuilder
    {
        $to = $this->rawResults;
        return $this;
    }


    public function storeCasted( array &$to ) : FilterBuilder
    {
        $to = $this->cast( $this->rawResults );
        return $this;
    }
}