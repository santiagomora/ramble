<?php

namespace App\DataFixture;

use App\DataFixture\CompanyFixture;
use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixture extends Fixture implements DependentFixtureInterface
{
    public const CATEGORY_COUNT = 10;

    public const CATEGORY_REFERENCE = "category";

    public function getDependencies(): array
    {
        return array(
            AdminFixture::class,
            CompanyFixture::class
        );
    }

    public function load(ObjectManager $manager)
    {
        $catIndex = 0;
        $j= 0;
        for( $i=0; $i<AdminFixture::ADMIN_COUNT; $i++ )
        {
            $admin = $this->getReference( AdminFixture::ADMIN_REFERENCE );
            for ($j=$catIndex; $j<self::CATEGORY_COUNT+$catIndex; $j++) {
                $this->addReference(
                    self::CATEGORY_REFERENCE."_$j",
                    $this->createCategory($j-$catIndex,$manager,$admin)
                );
            }
            $catIndex+=$j;
        }
        $manager->flush();
    }

    public function setCompany( Category &$category ) : void
    {
        $companyCount = CompanyFixture::COMPANY_COUNT-1;
        $companyRand = rand(0,2*$companyCount+2);

        if( $companyRand<$companyCount )
        {
            $company = $this->getReference(CompanyFixture::COMPANY_REFERENCE."_$companyRand");
            $category->setCaCompany( $company );
        }
    }

    private function createCategory( int $index, ObjectManager $manager, Admin $admin) : Category
    {
        $category = new Category();
        $category->setCaAdmin($admin);
        $category->setCaName( 'Category '.$index );
        $this->setCompany($category);
        $manager->persist($category);
        return $category;
    }
}
