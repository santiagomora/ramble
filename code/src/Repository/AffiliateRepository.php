<?php

namespace App\Repository;

use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;

class AffiliateRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    public function indexFormAffiliatesByAdmin(array $queryParams)
    {
        return $this->createQueryBuilder('af1')
            ->select('af')
            ->from('App:Affiliate','af')
            ->join('App:Admin','am')
            ->where('am.amId=:amId')
            ->setParameters($queryParams);
    }

    public function indexFormAffiliatesByCompany(array $queryParams)
    {
        return  $this->createQueryBuilder('af2')
            ->select('af')
            ->from('App:Affiliate','af')
            ->join('App:Category','ac')
            ->join('App:Company','co')
            ->where('co.coId=:coId')
            ->setParameters($queryParams);
    }

    public function indexAllAffiliates( $indexParams )
    {
        $query = 'select af from App:Affiliate af';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexAffiliatesByCompany( $indexParams )
    {
        $query ='select af,ac,co from App:Affiliate af join af.acCategory ac join ac.caCompany co where co.coId=:coId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexAffiliatesByAdmin( $indexParams )
    {
        $query = 'select af from App:Affiliate af join af.afAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function findAffiliateByCompany( array $singleParams )
    {
        $query = 'select af from App:Affiliate af join af.acCategory ac join ac.caCompany co where af.afId=:afId and co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findAffiliateByAdmin( array $singleParams )
    {
        $query = 'select af from App:Affiliate af join af.afAdmin am where am.amId=:amId and af.afId=:afId';
        return $this->performSingleQuery($query,$singleParams);
    }
}