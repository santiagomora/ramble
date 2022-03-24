<?php

namespace App\DataFixture;

use App\Entity\Company;
use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CompanyFixture extends Fixture implements DependentFixtureInterface
{
    private $encoder;

    public const COMPANY_REFERENCE = "company";

    public const COMPANY_COUNT = 3;

    private $random_strings= [
        '66FJrOiINI5cPaF7KCtA',
        'AZaLN6vIMBaRT9YYBdLx',
        'GPefrUsueVvHBHJLKePP',
        '4Kk2UrO96ZFXTdblNAtF',
        'm7VPMDZtVuvJDCs7DPTl',
        'pvwmrhtprDh5dzao3vYh',
        'u85ofHA8Yy9Da0PBcXAv',
        'glLdeM77HqD9YNefNIte',
        'x3Y93A6tzdCgDEUUtawl',
        'IcdpXdgAtBAPKWezEeRX'
    ];

    private $admin;

    public function __construct( UserPasswordEncoderInterface $encoder ){
        $this->encoder = $encoder;
    }

    public function getDependencies(): array
    {
        return array(
            AdminFixture::class
        );
    }

    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $this->admin = $this->getReference(AdminFixture::ADMIN_REFERENCE);
        for ($i = 0; $i < self::COMPANY_COUNT; $i++)
        {
            $this->addReference(
                self::COMPANY_REFERENCE."_$i",
                $this->createCompany($i,$manager)
            );
        }
        $manager->flush();
    }

    private function createCompany( int $index, ObjectManager $manager ) : Company
    {
        // am_logo,am_api_token,am_email,am_password
        $company = new Company();
        $now = new \DateTime();
        $company->setCoApiToken( $this->random_strings[$index] )
            ->setCoEmail( 'company'.$index.'@jobeet.com' )
            ->setCoAdmin( $this->admin )
            ->setCoLogo( 'logo' )
            ->setCoName( 'Company '.$index )
            ->setPassword(
                $this->encoder->encodePassword(
                    $company,
                    'password'
                )
            )
            ->setCoCreatedAt($now)
            ->setCoUpdatedAt($now);
        $manager->persist($company);
        return $company;
    }
}
