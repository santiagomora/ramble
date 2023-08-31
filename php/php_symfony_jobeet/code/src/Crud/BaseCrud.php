<?php


namespace App\Crud;

use App\Contract\RoleInterface;
use App\Contract\EntityInterface;
use App\Manager\ActionManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class BaseCrud
{
    /*
     * Esta es una clase base para la abstraccion crud sobre las entidades del sistema.
     * Las tareas de esta capa son:
     * -    Gestiona todas las acciones disponibles sobre las entidades del sistema, desde
     *      las basicas CRUD, hasta algunas especificas como affiliate, usando el roleManager
     *      para comprobar los permisos.
     */

    protected $repository;

    protected $entityManager;

    protected $userRole;

    protected $actionManager;

    protected $roleName;

    public function __construct(
        EntityManagerInterface $_entityManager,
        RoleInterface $_userRole,
        ActionManager $_actionManager
    )
    {
        $this->repository = $_entityManager->getRepository($this->getEntityClassName());
        $this->entityManager = $_entityManager;
        $this->userRole = $_userRole;
        $this->actionManager = $_actionManager;
        $this->roleName = $this->userRole->getRoleName();
    }

    public function getCrudId() : string
    {
        return "get".$this->getCrudIdField();
    }

    private function getCrudIdField() : string
    {
        return $this->getEntityClassName()::ENTITY_ID_FIELDNAME;
    }

    public function getCrudSlug() : string
    {
        return $this->getEntityClassName()::ENTITY_SLUG;
    }

    public function isQueryAllowed( string $queryName ) : bool
    {
        $allowedQueries = $this->getAllowedQueriesByRole($this->roleName);
        return !is_bool(array_search($queryName,$allowedQueries));
    }

    public function isActionAllowed( string $actionSlug ):bool
    {
        return !is_bool( array_search($this->roleName,$this->getCrudActions()[$actionSlug]) );
    }

    public function getQueryParams( ?int $id ):array
    {
        $params = [];
        if ($id)
        {
            $params[$this->getCrudIdField()] = $id;
        }
        return $params;
    }

    private function getPaginateParams(  &$queryParams ) :array
    {
        $paginate = [];
        if(isset($queryParams['paginate']))
        {
            $paginate = $queryParams['paginate'];
            unset($queryParams['paginate']);
        }
        return isset($queryParams['params'])
            ? array_merge(['paginate'=>$paginate],$queryParams)
            : ['params' => $queryParams,'paginate' => $paginate];
    }

    public function performCrudQuery( string $action, string $queryName, array $queryParams )
    {
        if ( $this->isQueryAllowed($queryName) && $this->isActionAllowed($action) )
        {
            $params = $this->getPaginateParams($queryParams);
            return $this->repository->{$queryName}($params);
        }
        throw new AccessDeniedHttpException;
    }

    public function getEntityIndex( string $actionSlug, string $searchName = "", array $extraParams = [] )
    {
        $roleIndexQuery = $searchName ? $searchName : $this->getIndexQueryByRole( $this->roleName );
        $queryParams = array_merge($this->userRole->getIndexParams(),$extraParams);
        return $this->performCrudQuery($actionSlug,$roleIndexQuery,$queryParams);
    }

    public function getEntityInstance( string $actionSlug, int $id ) : EntityInterface
    {
        $params = $this->getQueryParams($id);
        $roleParams = $this->userRole->getSingleParams($params);
        $queryName = $this->getSingleQueryByRole($this->roleName);
        return $this->performCrudQuery($actionSlug,$queryName,array_merge($roleParams,$params))->getOneOrNullResult();
    }

    public function getEmptyEntityInstance( string $actionSlug )
    {
        $className = $this->getEntityClassName();
        If( $this->isActionAllowed($actionSlug) )
            return new $className;
        throw new AccessDeniedHttpException;
    }

    abstract public function getEntityForm() : string;

    abstract public function getEntityClassName() : string;

    abstract public function getCrudActions() : array;

    abstract public function getIndexTableInfo() : array;

    abstract public function getIndexViewTitle() : string;

    abstract public function getAllowedQueriesByRole( string $roleName ): array;

    abstract public function getIndexQueryByRole( string $roleName ) : string;

    abstract public function getSingleQueryByRole( string $roleName ) : string;
}