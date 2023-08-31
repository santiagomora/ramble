<?php

namespace App\Repository;

use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\CountWalker;

class JobRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    private function getAnonymousSearchQuery($query) :string
    {
        return $query.'
                where ( po.poName like :search
                or  jt.jtName like :search
                or ca.caName like :search
                or co.coName like :search
                or jb.jbTitle like :search
            )';
    }

    public function getJobsByCategory( array $params )
    {
        $query = $this
            ->createNativeNamedQuery('getJobsByCategory')
            ->setParameters($params)
            ->getResult();
        return $query;
    }

    public function indexJobsByCompany( $indexParams )
    {
        $query = 'select jb from App:Job jb join jb.jbCompany co where co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexJobsByAdmin( $indexParams )
    {
        $query = 'select jb from App:Job jb join jb.jbAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    //dos casos, cuando hago query con compañia, y cuando no lo hago

    public function processUserJobSearch( $indexParams )
    {
        $baseQuery = 'select jb from App:Job jb join jb.jbPosition po join jb.jbCategory ca join jb.jbType jt';
        $withCompanies = ' join jb.jbCompany co ';
        $query = isset($indexParams['params']['filters']['coId'])
            ? $baseQuery.$withCompanies
            : $baseQuery;
        $query = isset($indexParams['params']['search'])
            ? $this->getAnonymousSearchQuery($baseQuery.$withCompanies)
            : $query;
        $query = isset($indexParams['params']['filters'])
            ? $this->applyFiltersOnQuery(
                $indexParams['params'],
                $query
            )
            : $query;
        return $this->performIndexQuery($query,$indexParams);
    }

    public function findJobByAdmin( array $singleParams )
    {
        $query = 'select jb from App:Job jb join jb.jbAdmin am where am.amId=:amId and jb.jbId=:jbId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findJobByCompany( array $singleParams )
    {
        $query = 'select jb from App:Job jb join jb.jbCompany co where co.coId=:coId and jb.jbId=:jbId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findJobByAnonymous( array $singleParams )
    {
        $query = 'select jb from App:Job jb where jb.jbId=:jbId';
        return $this->performSingleQuery($query,$singleParams);
    }

}