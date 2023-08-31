<?php

namespace App\DataFixture;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Affiliate;
use App\Entity\Admin;
use phpDocumentor\Reflection\Types\Collection;

class AffiliateFixture extends Fixture implements DependentFixtureInterface
{
    public const AFFILIATE_REFERENCE = "affiliate";

    public const AFFILIATE_COUNT = 10;

    private $random_strings = [
        "fyptk0y3h7k6t49hh2wh",
        "sx32te748fkx1sv98l1h",
        "vikxr5562jg8fhkb0nj0",
        "z61u1e3yczti8ne0bhv5",
        "2mx38xsq1zuqfobvzjd1",
        "m56id4zhiiqi2cqleucp",
        "qsnxpq3descg6kcz901m",
        "xxo7j2hjzup5u7cjgk67",
        "4ykwumo9lecfplnfg913",
        "gmkpy3i8cg3vxzgapng9"
    ];

    private $admin;

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
        for ($i = 0; $i < self::AFFILIATE_COUNT; $i++)
        {
            $this->addReference(
                self::AFFILIATE_REFERENCE."_$i",
                $this->createAffiliate($i,$manager)
            );
        }
        $manager->flush();
    }

    private function createAffiliate( int $index, ObjectManager $manager ) : Affiliate
    {
        // am_logo,am_api_token,am_email,am_password
        $affiliate = new Affiliate();
        $now = new \DateTime();
        $affiliate
            ->setAfName( 'Affiliate '.$index )
            ->setAfAdmin( $this->admin )
            ->setAfUrl( 'https://localhost/affiliate'.$index.'/path/to/url' )
            ->setAfEmail( 'affiliate'.$index.'@localhost')
            ->setAfName( 'Affiliate '.$index )
            ->setAfToken( $this->random_strings[$index] )
            ->setAfCreatedAt( $now )
            ->setAfUpdatedAt( $now )
            ->setAfActive( true );
        $manager->persist($affiliate);
        return $affiliate;
    }

}
