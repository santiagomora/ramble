<?php

namespace App\DataFixture;

use App\Entity\Admin;
use App\Entity\JobType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class JobTypeFixture extends Fixture implements DependentFixtureInterface
{
    public const JOB_TYPE_COUNT = 15;

    public const JOB_TYPE_REFERENCE = "job_type";

    private $jobTypes = [
        "Part Time",
        "Freelance",
        "Full Time",
        "Mix",
        "Full time + extra",
        "Part time + Remote",
        "Remote"
    ];

    public function getDependencies(): array
    {
        return array(
            AdminFixture::class,
            CompanyFixture::class
        );
    }

    public function load(ObjectManager $manager)
    {
        $cantPos = 0;
        $j = 0;
        for ($i = 0; $i < AdminFixture::ADMIN_COUNT; $i++)
        {
            $admin = $this->getReference(AdminFixture::ADMIN_REFERENCE);
            for( $j=$cantPos; $j<self::JOB_TYPE_COUNT+$cantPos; $j++ )
            {
                $this->addReference(
                    self::JOB_TYPE_REFERENCE."_$j",
                    $this->createJobType($j-$cantPos,$manager,$admin)
                );
            }
            $cantPos=$j;
        }
        $manager->flush();
    }


    public function setCompany( JobType &$jobType ) : void
    {
        $companyCount = CompanyFixture::COMPANY_COUNT-1;
        $companyRand = rand(0,2*$companyCount+2);

        if( $companyRand<$companyCount )
        {
            $company = $this->getReference(CompanyFixture::COMPANY_REFERENCE."_$companyRand");
            $jobType->setJtCompany( $company );
        }
    }

    private function createJobType( int $index,ObjectManager $manager, Admin $admin ) : JobType
    {
        $jobType = new JobType();
        $rand = rand(0,count($this->jobTypes)-1);
        $jtName = $this->jobTypes[$rand];
        $jobType->setJtAdmin($admin);
        $jobType->setJtName( $jtName);
        $this->setCompany($jobType);
        $manager->persist($jobType);
        return $jobType;
    }
}
