<?php


namespace App\Manager;

use App\Action\AffiliateAction;
use App\Action\BaseAction;
use App\Action\CreateAction;
use App\Action\DeleteAction;
use App\Action\EditAction;
use App\Action\IndexAction;
use App\Action\ViewAction;
use App\Contract\HasModalFormInterface;
use App\Contract\RoleInterface;
use App\Helper\ArrayHelper;
use App\Role\RoleAdmin;
use App\Role\RoleAnonymous;
use App\Role\RoleCompany;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Security;

class ActionManager
{
    private $urlGenerator;

    private $formFactory;

    private $userRole;

    private $arrayHelper;

    private $actionMapping = [
        "index" => IndexAction::class,
        "view" => ViewAction::class,
        "affiliate" => AffiliateAction::class,
        "create" => CreateAction::class,
        "delete" => DeleteAction::class,
        "edit" => EditAction::class
    ];

    public function __construct(
        ArrayHelper $_arrayHelper,
        UrlGeneratorInterface $_urlGenerator,
        FormFactoryInterface $_formFactory,
        RoleManager $_roleManager
    )
    {
        $this->urlGenerator = $_urlGenerator;
        $this->formFactory = $_formFactory;
        $this->arrayHelper = $_arrayHelper;
        $this->userRole = $_roleManager->getUserRole();
    }

    private function getActionInstanceBySlug( string $actionSlug ) : BaseAction
    {
        $action = $this->actionMapping[$actionSlug];
        return new $action( $this->urlGenerator,$this->userRole );
    }

    public function getEntityActionsByUserRole( array $actions ) : array
    {
        $actionInstances = [];
        foreach ( $actions as $actionSlug=>$actionRoles )
        {
            if( !is_bool(array_search($this->userRole->getRoleName(),$actionRoles)) )
            {
                $actionInstance = $this->getActionInstanceBySlug($actionSlug);
                if ( $actionInstance instanceof HasModalFormInterface )
                {
                    $actionInstance->setFormFactory( $this->formFactory );
                }
                array_push( $actionInstances,$actionInstance );
            }
        }
        return $actionInstances;
    }

    public function getActionsByRole( array $actions, string $entityClassName ) : array
    {
        $resultActions = array();
        $resultActions[$entityClassName] = $this->getEntityActionsByUserRole( $actions );
        return $resultActions;
    }

    public function getActionsWithout( array $crudActions, string $entityClassName, array $excludeActions = []  ) : array
    {
        $actions = $this->arrayHelper->removeItemsFromArray( $excludeActions,$crudActions );
        return $this->getActionsByRole($actions,$entityClassName);
    }

    public function getActionsWith( array $crudActions, string $entityClassName, array $includeActions = [] ) : array
    {
        $actions = $this->arrayHelper->includeItemsInArray( $includeActions,$crudActions );
        return $this->getActionsByRole($actions,$entityClassName);
    }

}