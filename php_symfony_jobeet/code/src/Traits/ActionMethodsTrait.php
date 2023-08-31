<?php


namespace App\Traits;


trait ActionMethodsTrait
{
    public function getRouteName() : string
    {
        return $this->routeName;
    }

    public function getRouteParams() : array
    {
        return $this->routeParams;
    }
}