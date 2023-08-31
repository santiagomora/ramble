<?php

namespace App\Controller;

use App\Contract\CrudInterface;
use App\Contract\EntityInterface;
use App\Contract\HasCrudViewManagerInterface;
use App\Manager\CrudViewManager;
use App\Traits\CrudTrait;
use App\Traits\HasCrudViewManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class CompanyController extends AuthController implements HasCrudViewManagerInterface
{
    use HasCrudViewManagerTrait;

    private $crudViewManager;

    public function __construct(CrudViewManager $_crudViewManager)
    {
        $this->crudViewManager = $_crudViewManager;
    }

    public function getDefaultRedirectAfterSubmit() : string
    {
        return 'company-crud-view';
    }

    protected function getLoginView() : string
    {
        return "companies/login.html.twig";
    }

    protected function getLoginDashboardRedirect() : string
    {
        return "company-dashboard";
    }

    /**
     * @Route("/company/dashboard", name="company-dashboard")
     */
    public function companyIndex(): Response
    {
        return (!$this->getUser())
            ? $this->redirectToRoute('company-login')
            : $this->render('companies/index.html.twig', ['controller_name' => 'CompanyController' ]);
    }

    /**
     * @Route("/register", name="company-register")
     */
    public function companyRegister(): Response
    {
        return $this->render('companies/index.html.twig', [
            'controller_name' => 'CompanyController',
        ]);
    }

    /**
     * @Route("/company", name="company-login")
     */
    public function loginControl(AuthenticationUtils $authenticationUtils): Response
    {
        return $this->login($authenticationUtils);
    }

    /**
     * @Route("/company/logout", name="company-logout")
     */
    public function companyLogoutControl()
    {
       $this->logout();
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "company/{slug}/edit/{id}",
     *     name="company-crud-edit",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function companyCrudEdit( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->processEditCreate( $request,["index","view","delete"] );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "company/{slug}/create",
     *     name="company-crud-create",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function companyCrudCreate( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->processEditCreate( $request,["index"] );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "company/{slug}",
     *     name="company-crud-index",
     *     requirements={
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function companyCrudIndex( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        $paginate = $this->buildPaginationParams($request);
        return $this->render(
            "crud/index.html.twig",
            $this->crudViewManager->buildCrudIndex($request,$paginate)
        );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "company/{slug}/{id}",
     *     name="company-crud-delete",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     },
     *     methods={"DELETE"}
     * )
     */
    public function companyCrudDelete( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->render(
            'crud/delete.html.twig'
        );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "company/{slug}/{id}",
     *     name="company-crud-view",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function companyCrudView( Request $request ) : Response
    {
        $id = $request->get('id');
        $slug =$request->get('slug');
        $this->crudViewManager->setEntityCrud($slug);
        return $this->render(
            "crud/single/$slug-single.html.twig",
            $this->crudViewManager->buildCrudView($request,["edit","delete","index"])
        );
    }
}
