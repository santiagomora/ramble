<?php

namespace App\DataFixture;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CategoryAffiliateFixture extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return array(
            CategoryFixture::class,
            AffiliateFixture::class
        );
    }

    public function load(ObjectManager $manager)
    {
        for( $i=0; $i<CategoryFixture::CATEGORY_COUNT; $i++ )
        {
            $category = $this->getReference(CategoryFixture::CATEGORY_REFERENCE."_$i" );
            for( $k=0; $k<AffiliateFixture::AFFILIATE_COUNT; $k++ )
            {
                $affiliate = $this->getReference(AffiliateFixture::AFFILIATE_REFERENCE."_$k");
                $category->addAcAffiliate( $affiliate );
                $manager->persist( $category );
            }
        }

        $manager->flush();
    }

}
