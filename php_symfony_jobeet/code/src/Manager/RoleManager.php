<?php


namespace App\Manager;

use App\Contract\RoleInterface;
use App\Role\RoleAdmin;
use App\Role\RoleAnonymous;
use App\Role\RoleCompany;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Contract\HasModalFormInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Security\Core\Security;

class RoleManager
{
    private $security;

    private $userRole;

    private $roleMapping = [
        "ROLE_ADMIN" => RoleAdmin::class,
        "ROLE_COMPANY" => RoleCompany::class,
        "ROLE_ANONYMOUS" => RoleAnonymous::class
    ];

    public function __construct( Security $_security )
    {
        $this->security = $_security;
        $this->setUserRole();
    }

    private function getRoleInstanceBySlug( string $roleSlug ) : RoleInterface
    {
        $role = $this->roleMapping[$roleSlug];
        return new $role();
    }

    private function setUserRole() : self
    {
        $user = $this->security->getUser();
        $role = is_null($user) ? 'ROLE_ANONYMOUS' : $user->getRoles()[0];
        $this->userRole = new $this->roleMapping[$role]($user);
        return $this;
    }

    public function getUserRole()
    {
        return $this->userRole;
    }
}