<?php

namespace App\Controller;

use App\Contract\EntityInterface;
use App\Contract\HasCrudViewManagerInterface;
use App\Manager\CrudViewManager;
use App\Traits\HasCrudViewManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends AuthController implements HasCrudViewManagerInterface
{
    use HasCrudViewManagerTrait;

    private $crudViewManager;

    public function __construct(CrudViewManager $_crudViewManager)
    {
        $this->crudViewManager = $_crudViewManager;
    }

    protected function getLoginView() : string
    {
        return "admin/login.html.twig";
    }

    protected function getLoginDashboardRedirect() : string
    {
        return "admin-dashboard";
    }

    public function getDefaultRedirectAfterSubmit() : string
    {
        return 'admin-crud-view';
    }

    /**
     * @Route("/admin/dashboard", name="admin-dashboard")
     */
    public function adminIndex(): Response
    {
        return (!$this->getUser())
            ? $this->redirectToRoute('admin-login')
            : $this->render('admin/index.html.twig', ['controller_name' => 'AdminController']);
    }
    /**
     * @Route("/admin", name="admin-login")
     */
    public function adminLoginControl(AuthenticationUtils $authenticationUtils): Response
    {
        return $this->login($authenticationUtils);
    }

    /**
     * @Route("/admin/logout", name="admin-logout")
     */
    public function adminLogoutControl()
    {
        $this->logout();
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "admin/{slug}/edit/{id}",
     *     name="admin-crud-edit",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function adminCrudEdit( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->processEditCreate( $request,["index","view","delete"] );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "admin/{slug}/create",
     *     name="admin-crud-create",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function adminCrudCreate( Request $request ) : Response
    {
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->processEditCreate( $request,["index"] );
    }

    /**
     * @param Request $request
     * @return Response
     * @Route(
     *     "admin/{slug}",
     *     name="admin-crud-index",
     *     requirements={
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function adminCrudIndex( Request $request ) : Response
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
     *     "admin/{slug}/{id}",
     *     name="admin-crud-delete",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     },
     *     methods={"DELETE"}
     * )
     */
    public function adminCrudDelete( Request $request ) : Response
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
     *     "admin/{slug}/{id}",
     *     name="admin-crud-view",
     *     requirements={
     *          "id"="\d+",
     *          "slug"="jobs|categories|jobtypes|positions|companies|affiliates"
     *     }
     * )
     */
    public function adminCrudView( Request $request ) : Response
    {
        $id = $request->get('id');
        $slug = $request->get('slug');
        $this->crudViewManager->setEntityCrud($request->get('slug'));
        return $this->render(
            "crud/single/$slug-single.html.twig",
            $this->crudViewManager->buildCrudView($request,["edit","delete","index"])
        );
    }
}
