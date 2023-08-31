<?php


namespace App\Traits;


use Doctrine\ORM\Tools\Pagination\Paginator;

trait PaginateRepositoryTrait
{
    public function paginateIfRequired( $query,$paginateParams )
    {
        return !empty($paginateParams)
            ? $query->setFirstResult($paginateParams['limit'] * ($paginateParams['page']-1))->setMaxResults($paginateParams['limit'])
            : $query;
    }

    public function performIndexQuery( string $queryString,array $queryParams )
    {
        $query = $this->getEntityManager()
            ->createQuery($queryString)
            ->setParameters($queryParams['params']);
        return $this->paginateIfRequired( $query,$queryParams['paginate'] );
    }

    public function performSingleQuery( string $queryString,$queryParams )
    {
        return $this->getEntityManager()
            ->createQuery($queryString)
            ->setParameters($queryParams['params']);
    }

    private function applyFiltersOnQuery( array &$params, string $query ) :string
    {
        $mapping = ["coId"=>"co","poId"=>"po","caId"=>"ca","jtId"=>"jt"];
        foreach($params['filters'] as $id=>$idVal)
        {
            $predicate = preg_match('/where/',$query) ? " and " : " where ";
            $idStr = implode(",",$idVal);
            $query.=$predicate.$mapping[$id].".$id in ($idStr)";
        }
        //dd($query);
        unset($params['filters']);
        return $query;
    }
}