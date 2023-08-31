<?php

namespace App\Repository;

use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;

class CategoryRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    public function indexFormCategoriesByAdmin(array $queryParams)
    {
        return $this->createQueryBuilder('ca')
            ->select('ca')
            ->from('App:Category','ca')
            ->join('ca.caAdmin','am','WITH','am.amId=:amId')
            ->setParameters($queryParams);
    }

    public function indexFormCategoriesByCompany(array $queryParams)
    {
        return  $this->createQueryBuilder('ca')
            ->select('ca')
            ->join('ca.caCompany','co','WITH','co.coId=:coId')
            ->setParameters($queryParams);
    }

    public function indexCategoriesByCompany( $indexParams )
    {
        $query = 'select ca from App:Category ca join ca.caCompany co where co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexCategoriesByAnonymous( array $indexParams )
    {
        return $this->getEntityManager()
            ->createQuery('select distinct ca.caName as name from App:Category ca');
    }

    public function indexCategoriesByAdmin( $indexParams )
    {
        $query = 'select ca from App:Category ca join ca.caAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexAllCategories( $indexParams )
    {
        $query = 'select ca from App:Category ca';
        $withCompanies = ' join ca.caCompany co';
        $query = isset($indexParams['params']['filters'])
            ? $this->applyFiltersOnQuery(
                $indexParams['params'],
                isset($indexParams['params']['filters']['coId']) ? $query.$withCompanies : $query
            )
            : $query;
        return $this->performIndexQuery($query,$indexParams);
    }

    public function findCategoryByCompany( array $singleParams )
    {
        $query = 'select ca from App:Category ca join ca.caCompany co where ca.caId=:caId and co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findCategoryByAdmin( array $singleParams )
    {
        $query = 'select ca from App:Category ca join ca.caAdmin am where ca.caId=:caId and am.amId=:amId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findCategoryByAnonymous( array $singleParams )
    {
        $query = 'select ca from App:Category ca where ca.caId=:caId';
        return $this->performSingleQuery($query,$singleParams);
    }
}