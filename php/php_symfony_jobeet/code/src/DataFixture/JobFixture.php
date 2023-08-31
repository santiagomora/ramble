<?php

namespace App\DataFixture;

use App\Entity\Admin;
use App\Entity\JobType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Job;

class JobFixture extends Fixture implements DependentFixtureInterface
{
    private $cant_jobs = 180;

    private $public = [true,false];

    public function getDependencies(): array
    {
        return array(
            CompanyFixture::class,
            AdminFixture::class,
            JobTypeFixture::class,
            JobPositionFixture::class,
            CategoryFixture::class
        );
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < $this->cant_jobs; $i++)
        {
            $this->createJob($i,$manager);
        }
        $manager->flush();
    }

    public function setCompany( Job &$job ) : void
    {
        $companyCount = CompanyFixture::COMPANY_COUNT-1;
        $companyRand = rand(0,$companyCount*2);
        $jtRand = rand(0,JobTypeFixture::JOB_TYPE_COUNT-1);
        $poRand = rand(0,JobPositionFixture::JOB_POSITION_COUNT-1);
        $caRand = rand(0,CategoryFixture::CATEGORY_COUNT-1);

        $jobType = $this->getReference(JobTypeFixture::JOB_TYPE_REFERENCE."_$jtRand");
        $category = $this->getReference(CategoryFixture::CATEGORY_REFERENCE."_$caRand");
        $position = $this->getReference(JobPositionFixture::JOB_POSITION_REFERENCE."_$poRand");

        if( $companyRand<$companyCount )
        {
            $company = $this->getReference(CompanyFixture::COMPANY_REFERENCE."_$companyRand");
            $job->setJbCompany( $company )
                ->setJbCompanyName( $company->getCoName() )
                ->setJbEmail( $company->getCoEmail() );
        }
        else
        {
            $job->setJbCompanyName("Anonymous Company ".$companyRand)
                ->setJbEmail('company'.$companyRand.'@localhost');
        }
        $job->setJbCategory( $category )
            ->setJbType( $jobType )
            ->setJbPosition( $position );
    }

    public function createJob( int $index, ObjectManager $manager )
    {
        $puRand = rand(0,1);

        $admin = $this->getReference(AdminFixture::ADMIN_REFERENCE);

        $now = new \DateTime();
        $expires = new \DateTime();
        $expires->add( date_interval_create_from_date_string(rand(20,30).' days' ) );
        $job = new Job();
        $job->setJbLogo('https://localhost/path/to/logo'.$index)
            ->setJbUrl('https://localhost/path/to/url'.$index)
            ->setJbTitle('Job Title '.$index)
            ->setJbLocation('Job Location '.$index)
            ->setJbDescription('Job Description '.$index)
            ->setJbInstructions('Job Instructions '.$index)
            ->setJbToken('Token:'.$index.'Token:'.$index.'Token:'.$index)
            ->setJbPublic( $this->public[$puRand] )
            ->setJbActivated( $this->public[$puRand] )
            ->setJbExpiresAt( $expires )
            ->setJbCreatedAt( $now )
            ->setJbUpdatedAt( $now )
            ->setJbAdmin( $admin );
        $this->setCompany($job);
        $manager->persist($job);
    }

}
