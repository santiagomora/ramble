<?php


namespace App\Traits;


use App\Contract\EntityInterface;
use App\Manager\CrudViewManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

trait HasCrudViewManagerTrait
{
    public function getCrudViewManager() : CrudViewManager
    {
        return $this->crudViewManager;
    }

    private function getRedirectAfterSubmit( EntityInterface $entity ) : Response
    {
        $crudViewManager = $this->getCrudViewManager();
        $crudEntity= $crudViewManager->getEntityCrud();
        $defaultRedirect = [
            'name'=> $this->getDefaultRedirectAfterSubmit(),
            'params' => [
                'id' => $entity->{$crudManager->getCrudId()}(),
                'slug' => $crudManager->getCrudSlug()
            ]
        ];
        return has_method($crudEntity,"customRedirectAfterCreate")
            ? $crudManager->customRedirectAfterCreate($entity)
            : $this->redirectToRoute($defaultRedirect['name'],$defaultRedirect['params']);
    }

    private function processEditCreate( Request $request, array $withActions ) : Response
    {
        $crudViewManager = $this->getCrudViewManager();
        $crudData = $crudViewManager->buildCrudForm($request,$withActions);
        $crudSlug = $crudViewManager->getEntityCrud()->getCrudSlug();
        $defaultView = "crud/forms/create-edit-$crudSlug.html.twig";
        return ( $crudData['isSubmitOk'] )
            ? $this->getRedirectAfterSubmit($crudData['entityInstance'])
            : $this->render( $defaultView,$crudData ) ;
    }

    private function buildPaginationParams( Request $request ) :array
    {
        $limit = $request->query->get('limit')??'10';
        $page= $request->query->get('page')??'1';
        return ['paginate'=>['page'=>$page,'limit'=>$limit]];
    }
}