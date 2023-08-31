<?php


namespace App\Contract;


interface RoleInterface
{
    public function getActionParams(string $actionSlug) : array;

    public function getIndexParams() :array;

    public function getSingleParams( $entityParams ) :array;

    public function getRoleName() : string;
}