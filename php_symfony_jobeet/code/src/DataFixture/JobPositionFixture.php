<?php

namespace App\DataFixture;

use App\Entity\Admin;
use App\Entity\Position;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class JobPositionFixture extends Fixture implements DependentFixtureInterface
{

    public const JOB_POSITION_COUNT = 25;

    public const JOB_POSITION_REFERENCE = "job_position";

    public function getDependencies(): array
    {
        return array(
            AdminFixture::class,
            CompanyFixture::class
        );
    }

    private $jobPositions = [
        'PHP Developer',
        'UI/UX Designer',
        'PHP Team Leader',
        '.NET Team Leader',
        'Human Resources',
        'Ruby Developer',
        'Perl Developer',
        'C Developer',
        'C++ Developer',
        'Python Developer'
    ];

    public function load(ObjectManager $manager)
    {
        $cantPos = 0;
        $j=0;
        for( $i=0; $i<AdminFixture::ADMIN_COUNT; $i++ )
        {
            $admin = $this->getReference( AdminFixture::ADMIN_REFERENCE );
            for ($j = $cantPos; $j < self::JOB_POSITION_COUNT+$cantPos; $j++)
            {
                $this->addReference(
                    self::JOB_POSITION_REFERENCE."_$j",
                    $this->createPosition($j-$cantPos, $manager, $admin)
                );
            }
            $cantPos=$j;
        }
        $manager->flush();
    }

    public function setCompany( Position &$position ) : void
    {
        $companyCount = CompanyFixture::COMPANY_COUNT-1;
        $companyRand = rand(0,2*$companyCount+2 );

        if( $companyRand<$companyCount )
        {
            $company = $this->getReference(CompanyFixture::COMPANY_REFERENCE."_$companyRand");
            $position->setPoCompany( $company );
        }
    }


    private function createPosition( int $index, ObjectManager $manager, Admin $admin ) : Position
    {
        // am_logo,am_api_token,am_email,am_password
        $position = new Position();
        $rand = rand(0,count($this->jobPositions)-1);
        $jobName = $this->jobPositions[$rand];
        $position->setPoAdmin( $admin );
        $position->setPoName( $jobName );
        $position->setPoDescription( $jobName.': Description '.$rand );
        $this->setCompany($position);
        $manager->persist($position);
        return $position;
    }
}
