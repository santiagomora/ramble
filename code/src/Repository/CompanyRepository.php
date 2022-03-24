<?php

namespace App\Repository;

use App\Traits\PaginateRepositoryTrait;
use Doctrine\ORM\EntityRepository;

class CompanyRepository extends EntityRepository
{
    use PaginateRepositoryTrait;

    public function indexCompaniesByAdmin( $indexParams )
    {
        $query = 'select co from App:Company co join co.coAdmin am where am.amId=:amId';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function indexCompaniesByAnonymous( array $indexParams )
    {
        $query = 'select distinct co.coName as name from App:Company co';
        return $this->performIndexQuery($query,$indexParams);
    }

    public function findCompanyByCompany( array $singleParams )
    {
        $query = 'select co from App:Company co where co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findCompanyByAdmin( array $singleParams )
    {
        $query = 'select co from App:Company co join co.coAdmin am where co.coId=:coId and am.amId=:amId';
        return $this->performSingleQuery($query,$singleParams);
    }

    public function findCompanyByAnonymous( array $singleParams )
    {
        $query = 'select co from App:Company co where co.coId=:coId';
        return $this->performSingleQuery($query,$singleParams);
    }

}