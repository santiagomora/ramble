<?php

namespace App\DataFixture;

use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AdminFixture extends Fixture
{
    private $encoder;

    public const ADMIN_REFERENCE = "admin";

    public const ADMIN_COUNT = 1;

    private $random_strings = [
        'X4FgsZ3B7Yjwa48VvUMo'
    ];

    public function __construct( UserPasswordEncoderInterface $encoder )
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $rnd_len = count($this->random_strings);
        for ($i = 0; $i < self::ADMIN_COUNT; $i++)
        {
            $this->addReference(
                self::ADMIN_REFERENCE,
                $this->createAdmin($i,$manager)
            );
        }
        $manager->flush();
    }

    public function createAdmin( int $index,ObjectManager $manager ) : Admin
    {
        // am_logo,am_api_token,am_email,am_password
        $admin = new Admin();
        $now = new \DateTime();
        $admin->setAmApiToken( $this->random_strings[$index] )
            ->setAmEmail( 'admin'.$index.'@jobeet.com' )
            ->setAmLogo( 'logo' )
            ->setAmName( 'Admin '.$index )
            ->setPassword(
                $this->encoder->encodePassword(
                    $admin,
                    'password'
                )
            )
            ->setAmCreatedAt($now)
            ->setAmUpdatedAt($now);
        $manager->persist($admin);
        return $admin;
    }
}
