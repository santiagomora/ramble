<?php

namespace App\Controller;

use App\Contract\HasCrudViewManagerInterface;
use App\Filter\CategoryFilter;
use App\Filter\JobFilter;
use App\FormType\CategoryFilterFormType;
use App\FormType\JobFilterFormType;
use App\Helper\ArrayHelper;
use App\Traits\NeedsFilteringTrait;
use App\Manager\ActionManager;
use App\Manager\CrudViewManager;
use App\Manager\RoleManager;
use App\Traits\HasCrudViewManagerTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AnonymousController extends AbstractController implements HasCrudViewManagerInterface
{
    use HasCrudViewManagerTrait, NeedsFilteringTrait;

    private $arrayHelper;

    private $entityManager;

    private $actionManager;

    private $crudViewManager;

    public function __construct(
        ActionManager $_actionManager,
        ArrayHelper $_arrayHelper,
        EntityManagerInterface $_entityManager,
        RoleManager $_roleManager,
        CrudViewManager $_crudViewManager
    )
    {
        $userRole = $_roleManager->getUserRole();
        $this->arrayHelper = $_arrayHelper;
        $this->entityManager = $_entityManager;
        $this->actionManager = $_actionManager;
        $this->crudViewManager = $_crudViewManager;
    }

    public function getDefaultRedirectAfterSubmit() : string
    {
        return 'default-view';
    }

    private function getOptionsBySlug( string $slug ) : array
    {
        return $slug === 'categories'
            ? [
                "filterForm"=>CategoryFilterFormType::class,
                "filterEntity"=>new CategoryFilter(),
                'filters' =>["getCompanies" => "coId"],
                'view' => 'default/category/index.html.twig',
                'indexMethod' => 'indexAllCategories'
            ]
            : [
                "filterForm"=>JobFilterFormType::class,
                "filterEntity"=>new JobFilter(),
                'filters' =>[
                    "getCompanies" => "coId",
                    "getCategories" => "caId",
                    "getPositions" => "poId",
                    "getJobTypes" => "jtId"
                ],
                'view' => 'default/job/index.html.twig',
                'indexMethod' => 'processUserJobSearch'
            ];
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "/{slug}",
     *     name="anonymous-crud-index",
     *     requirements={
     *          "slug"="categories"
     *     },
     *     defaults={"slug"="jobs"}
     * )
     */
    public function mainIndex( Request $request ) : Response
    {
        $index = [];
        $slug = $request->get('slug');
        $options = $this->getOptionsBySlug($slug);
        $form = $this->createForm($options['filterForm'],$options['filterEntity']);
        $paginate = $this->checkForSearch($options['filters'],$form,$request,$index);
        $this->crudViewManager->setEntityCrud($slug);
        $index = array_merge($index,$this->crudViewManager->buildCrudIndex($request,$paginate,$options['indexMethod']));
        $index['filters'] = $form->createView();
        return $this->render($options['view'],$index);
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "/{slug}/create",
     *     name="anonymous-crud-create",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs"
     *     }
     * )
     */
    public function anonymousCrudCreate( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud('jobs');
        return $this->processEditCreate( $request,["index"] );
    }


    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "/{slug}/{id}",
     *     name="anonymous-crud-view",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories",
     *     }
     * )
     */
    public function anonymousCrudView( Request $request ) : Response
    {
        $id = $request->get('id');
        $crudSlug = $request->get('slug');
        $this->crudViewManager->setEntityCrud($crudSlug);
        return $this->render(
            "crud/single/$crudSlug-single.html.twig",
            $this->crudViewManager->buildCrudView($request,["index"])
        );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "/{slug}/edit/{id}",
     *     name="anonymous-crud-affiliate",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="categories"
     *     }
     * )
     */
    public function anonymousCrudAffiliate( Request $request ) : Response
    {
        return $this->processEditCreate( $request,["index","view","delete"] );
    }
}
