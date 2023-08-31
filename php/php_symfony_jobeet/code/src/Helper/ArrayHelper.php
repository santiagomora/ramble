<?php


namespace App\Helper;

use Doctrine\Common\Collections\Collection;

class ArrayHelper
{
    public function createAssociativeArray( array $targetArray, string $keyMethodName ) : array
    {
        return array_reduce(
            $targetArray,
            function($carr,$val) use ($keyMethodName) {
                $keyName = $val->{$keyMethodName}();
                $carr[$keyName] =  isset( $carr[$keyName] )
                    ? array_merge( $carr[$keyName],[$val] )
                    : [$val];
                return $carr;
            },
            array()
        );
    }

    public function removeItemsFromArray( array $removeItems, array $targetArray ) : array
    {
        $resArray = $targetArray;
        foreach($removeItems as $item)
        {
            if ( isset($resArray[$item] ) )
                unset( $resArray[$item] );
        }
        return $resArray;
    }

    public function includeItemsInArray( array $includeItems, array $targetArray ) : array
    {
        $resArray = [];
        foreach($includeItems as $item)
        {
            if ( isset($targetArray[$item]) )
                $resArray[$item] = $targetArray[$item];
        }
        return $resArray;
    }

    function pluckField( Collection $collection, string $fieldName ) : array
    {
        $res = $collection->map(
            function ( $elem ) use ($fieldName) {
                return $elem->{"get$fieldName"}();
            }
        );
        return $res->toArray();
    }

}