<?php


namespace App\Role;


use App\Contract\RoleInterface;

class RoleAnonymous implements RoleInterface
{
    private $roleName = "ROLE_ANONYMOUS";

    private $routeByActions = [
        "index" => [
            "name" => "anonymous-crud-index",
            "params" => ["slug"=>"%s"],
        ],
        "view" => [
            "name" => "anonymous-crud-view",
            "params" => ["slug"=>"%s"],
        ],
        "create" => [
            "name" => "anonymous-crud-create",
            "params" => ["slug"=>"%s"],
        ],
        "edit" => [
            "name" => "anonymous-crud-edit",
            "params" => ["slug"=>"%s"],
        ],
        "affiliate" => [
            "name" => "anonymous-crud-affiliate",
            "params" => ["slug"=>"%s"]
        ]
    ];

    public function getActionParams( string $actionSlug ) : array
    {
        return $this->routeByActions[$actionSlug];
    }

    public function getRoleName() : string
    {
        return $this->roleName;
    }

    public function getIndexParams() :array
    {
        return [];
    }

    public function getSingleParams( $entityParams ) :array
    {
        return $entityParams;
    }

}