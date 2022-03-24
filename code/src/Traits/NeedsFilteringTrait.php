<?php


namespace App\Traits;


use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

trait NeedsFilteringTrait
{

    public function checkForFilters( array $accessors, FormInterface $form, Request $request, array &$paginate ) :array
    {
        $res = [];
        $form->handleRequest($request);
        foreach( $accessors as $accessMethod=>$accessDesc )
        {
            $data = $form->getViewData()->{$accessMethod}();
            $plucked = $this->arrayHelper->pluckField($data,$accessDesc);
            if (count($plucked)>0)
                $res[$accessDesc] = $plucked;
        }
        if(!empty($res))
            $paginate['params']['filters'] = $res;
        return $res;
    }

    public function checkForSearch(array $acccesors, FormInterface $form, Request $request,array &$index) :array
    {
        $term = $request->query->get('search') ?? null;
        $paginate = $this->buildPaginationParams($request);
        $paginate['params'] = [];
        if (!is_null($term)) {
            $paginate = $this->buildPaginationParams($request);
            $paginate['params'] = ['search' => "%$term%"];
            $index['isSearchResult'] = $term;
        }
        $this->checkForFilters($acccesors,$form, $request,$paginate);
        return $paginate;
    }
}