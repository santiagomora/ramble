<?php


namespace App\Role;


use App\Contract\EntityInterface;
use App\Contract\RoleInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class RoleAdmin implements RoleInterface
{
    private $roleName = "ROLE_ADMIN";

    private $routeByActions = [
        "index" => [ "name" => "admin-crud-index"],
        "view" => [ "name" => "admin-crud-view"],
        "create" => [ "name" => "admin-crud-create" ],
        "edit" => [ "name" => "admin-crud-edit" ],
        "delete" => ["name" => "admin-crud-delete"]
    ];

    private $user;

    public function __construct( UserInterface $_user )
    {
        $this->user = $_user;
    }

    public function getActionParams( string $actionSlug ) : array
    {
        return $this->routeByActions[$actionSlug];
    }

    public function getIndexParams() :array
    {
        return ["amId" => $this->user->getAmId()];
    }

    public function getSingleParams( $entityParams ) :array
    {
        return array_merge(["amId" => $this->user->getAmId()],$entityParams);
    }

    public function getRoleName() : string
    {
        return $this->roleName;
    }

}