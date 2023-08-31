<?php


namespace App\Manager;


use App\Contract\EntityInterface;
use App\Crud\BaseCrud;
use App\Crud\AffiliateCrud;
use App\Crud\CategoryCrud;
use App\Crud\CompanyCrud;
use App\Crud\JobCrud;
use App\Crud\JobTypeCrud;
use App\Crud\PositionCrud;
use App\Helper\ArrayHelper;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;

class CrudViewManager
{

    protected $entityCrud;

    protected $entityManager;

    private $formFactory;

    private $userRole;

    private $actionManager;

    private $entityClassName;

    private $crudMapping = [
        "jobs" => JobCrud::class,
        "categories" => CategoryCrud::class,
        "jobtypes" => JobTypeCrud::class,
        "positions" => PositionCrud::class,
        "companies" => CompanyCrud::class,
        "affiliates" => AffiliateCrud::class
    ];

    public function __construct(
        RoleManager $_roleManager,
        EntityManagerInterface $_entityManager,
        FormFactoryInterface $_formFactory,
        ActionManager $_actionManager
    )
    {
        $this->formFactory = $_formFactory;
        $this->entityManager = $_entityManager;
        $this->userRole = $_roleManager->getUserRole();
        $this->actionManager = $_actionManager;
    }

    public function setEntityCrud( string $slug ) :self
    {
        $this->entityCrud = new $this->crudMapping[$slug]($this->entityManager,$this->userRole,$this->actionManager);
        $this->entityClassName = $this->entityCrud->getEntityClassName();
        return $this;
    }

    public function getEntityCrud(): BaseCrud
    {
        return $this->entityCrud;
    }

    public function buildEntityCrudInstance( string $slug ): BaseCrud
    {
        return new $this->crudMapping[$slug]($this->entityManager,$this->userRole,$this->actionManager);
    }

    private function onFormSuccess( FormInterface $form, EntityInterface $entityInstance, Request $request  ) : array
    {
        if ( method_exists( $this->entityCrud,"preSubmitEntity" ) )
        {
            $this->entityCrud->preSubmitEntity( $request,$form,$entityInstance );
        }
        $this->entityManager->persist( $entityInstance );
        $this->entityManager->flush();
        return [
            'isSubmitOk' => true,
            'entityInstance' => $entityInstance,
            'form' => $form->createView()
        ];
    }

    private function onFormError( FormInterface $form, EntityInterface $entityInstance, array $withActions ) : array
    {
        $dataActions = $this->actionManager->getActionsWith($this->entityCrud->getCrudActions(),$this->entityClassName,$withActions);
        return [
            'form' => $form->createView(),
            'dataActions' => $dataActions,
            'entityInstance' => $entityInstance,
            'isSubmitOk' => false
        ];
    }

    public function buildCrudForm( Request $request, array $withActions ) : array
    {
        $id = $request->get('id');

        $isCreate = is_null($id);

        $entityInstance = $isCreate
            ? $this->entityCrud->getEmptyEntityInstance( "create")
            : $this->entityCrud->getEntityInstance( "edit",$id);

        $entityForm = $this->entityCrud->getEntityForm();

        $form = $this->formFactory->create( $entityForm,$entityInstance );

        $form->handleRequest($request);

        $crudFormData =  ( $form->isSubmitted() && $form->isValid() )
            ? $this->onFormSuccess($form,$entityInstance,$request)
            : $this->onFormError($form,$entityInstance,$withActions);

        $crudFormData['isCreate'] = $isCreate;

        return $crudFormData;
    }

    protected function paginateIfRequired( $query,$indexParams )
    {
        return isset($indexParams['paginate'])
            ? new Paginator($query,false)
            : $query->getResult();
    }

    public function buildCrudIndex(Request $request, array $indexParams = [],string $searchName = ""): array
    {
        $entityIndex = $this->entityCrud->getEntityIndex("index",$searchName,$indexParams);
        $emptyInstance = $this->entityCrud->getEmptyEntityInstance("index");
        $emptyInstanceActions = $this->actionManager->getActionsWith($this->entityCrud->getCrudActions(),$this->entityClassName,["create"]);
        $actions = $this->actionManager->getActionsWith($this->entityCrud->getCrudActions(),$this->entityClassName,["edit", "view", "delete","affiliate"]);
        return  [
            "entityIndex" => $this->paginateIfRequired($entityIndex,$indexParams),
            "emptyInstance" => $emptyInstance,
            "emptyInstanceActions" => $emptyInstanceActions,
            "actions" => $actions,
            "tableInfo" => [
                "accessors" => $this->entityCrud->getIndexTableInfo()
            ],
            "title" => $this->entityCrud->getIndexViewTitle(),
            'limit' => $indexParams['paginate']['limit'],
            'page' => $indexParams['paginate']['page']
        ];
    }

    public function buildCrudDelete(Request $request): Response
    {
        return $this->render(
            'crud/delete.html.twig'
        );
    }

    public function buildCrudView(Request $request, array $withActions): array
    {
        $id = $request->get('id');
        $entityInstance = $this->entityCrud->getEntityInstance("view",$id);
        $crudExtraData = method_exists($this->entityCrud, "getSingleViewExtraData")
            ? $this->entityCrud->getSingleViewExtraData($id)
            : [];
        $dataActions = $this->actionManager->getActionsWith($this->entityCrud->getCrudActions(),$this->entityClassName,$withActions);
        return [
            'entityInstance' => $entityInstance,
            'dataActions' => $dataActions,
            'extraData' => $crudExtraData
        ];
    }

}