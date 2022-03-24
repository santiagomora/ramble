<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class AdminRepository extends EntityRepository
{
    public function findAdminByAdmin( array $singleParams )
    {
        return $this->createQueryBuilder('findAdminByAdmin')
            ->select('am')
            ->from('App:Admin','am')
            ->where('am.amId=:amId')
            ->setParameters($singleParams);
    }
}