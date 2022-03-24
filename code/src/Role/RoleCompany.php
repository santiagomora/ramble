<?php


namespace App\Role;


use App\Contract\RoleInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class RoleCompany implements RoleInterface
{
    private $roleName = "ROLE_COMPANY";

    private const COMPANY_ROUTE_PARAMS = ["user" => "company"];

    private $routeByActions = [
        "index" => ["name" => "company-crud-index"],
        "view" => ["name" => "company-crud-view"],
        "create" => ["name" => "company-crud-create"],
        "edit" => ["name" => "company-crud-edit"],
        "delete" => ["name" => "company-crud-delete"]
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

    public function getRoleName() : string
    {
        return $this->roleName;
    }

    public function getIndexParams() :array
    {
        return ["coId" => $this->user->getCoId()];
    }

    public function getSingleParams( $entityParams ) :array
    {
        return array_merge(["coId" => $this->user->getCoId()],$entityParams);
    }

    public function isCompany()
    {

    }
}