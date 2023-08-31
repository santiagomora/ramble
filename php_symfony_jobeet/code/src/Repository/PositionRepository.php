<?php


namespace App\Repository;


use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;
use App\Entity\Position;

class PositionRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    public function indexPositionsByCompany( $indexParams )
    {
        $query = 'select po from App:Position po join po.poCompany co where co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexPositionsByAdmin( $indexParams )
    {
        $query = 'select po from App:Position po join po.poAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexPositionsByAnonymous( $indexParams )
    {
        return $this->getEntityManager()
            ->createQuery('select distinct po.poName as name from App:Position po');
    }

    public function findPositionByAdmin( array $singleParams )
    {
        $query = 'select po from App:Position po join po.poAdmin am where po.poId=:poId and am.amId=:amId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findPositionByCompany( array $singleParams )
    {
        $query = 'select po from App:Position po join po.poCompany co where po.poId=:poId and co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }
}