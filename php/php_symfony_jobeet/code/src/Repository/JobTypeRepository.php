<?php


namespace App\Repository;


use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;
use App\Entity\Position;

class JobTypeRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    public function indexJobTypesByCompany( $indexParams )
    {
        $query = 'select jt from App:JobType jt join jt.jtCompany co where co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexJobTypesByAdmin( $indexParams )
    {
        $query = 'select jt from App:JobType jt join jt.jtAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexAllJobTypes( $indexParams )
    {
        $query = 'select jt from App:JobType jt join jt.jtCompany co where jt.jtId=:jtId and co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function findJobTypeByAdmin( array $singleParams )
    {
        $query = 'select jt from App:JobType jt join jt.jtAdmin am where jt.jtId=:jtId and am.amId=:amId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findJobTypeByCompany( array $singleParams )
    {
        $query = 'select jt from App:JobType jt join jt.jtCompany co where jt.jtId=:jtId and co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function indexJobTypesByAnonymous( array $singleParams )
    {
        return $this->getEntityManager()
            ->createQuery('select distinct jt.jtName as name from App:JobType jt')
            ->setParameters($singleParams['params']);
    }
}