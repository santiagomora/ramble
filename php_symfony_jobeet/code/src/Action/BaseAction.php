<?php

namespace App\Action;

use App\Contract\RoleInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Contract\EntityInterface;
use Symfony\Component\Security\Core\Security;

abstract class BaseAction
{
    /*
     * Las acciones se manejan a nivel de la vista, luego de ser asignadas por el
     * roleManager dependiendo de los permisos asignados en la capa crud.
     * Esta clase base abstracta se encarga de armar la ruta de accion dependiendo
     * del rol del usuario actual y de los parametros del crud sobre el cual se realizara la accion
     */

    protected $entity;

    protected $urlGenerator;

    private $userRole;

    public function __construct( UrlGeneratorInterface $_urlGenerator, RoleInterface $_userRole ){
        $this->urlGenerator = $_urlGenerator;
        $this->userRole = $_userRole;
    }

    public function setActionEntity( EntityInterface $_entity ) : self
    {
        $this->entity = $_entity;
        return $this;
    }

    protected function buildRouteParams( ) : array
    {
        $prefix = $this->entity::ENTITY_PREFIX;
        $extraParams = [];
        foreach( $this->getActionRouteParams() as $paramName=>$paramMethod )
        {
            $method = str_replace("%s",$prefix,$paramMethod );
            $extraParams[$paramName] = $this->entity->{$method}();
        }
        return $extraParams;
    }

    private function getSlugRouteParam() :array
    {
        return ["slug" => $this->entity::ENTITY_SLUG];
    }

    protected function getRoleRouteParams() : array
    {
        $routeInfo = $this->userRole->getActionParams( $this->getActionSlug() );
        $routeInfo['params'] = array_merge(
            $this->getSlugRouteParam(),
            $this->buildRouteParams()
        );
        return $routeInfo;
    }

    protected function buildActionRoute() : string
    {
        $routeInfo = $this->getRoleRouteParams();
        return $this->urlGenerator->generate( $routeInfo['name'],$routeInfo['params'] );
    }

    abstract public function getDisplayOptions() : array;

    abstract protected function getActionRouteParams() : array;

    abstract protected function getActionSlug() : string;
}