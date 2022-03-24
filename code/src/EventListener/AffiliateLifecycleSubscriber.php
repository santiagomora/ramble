<?php

namespace App\EventListener;

use App\Entity\Admin;
use App\Entity\Affiliate;
use App\Entity\Category;
use App\Helper\StringHelper;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class AffiliateLifecycleSubscriber implements EventSubscriber
{
    private $stringHelper;

    public function __construct( StringHelper $_stringHelper)
    {
        $this->stringHelper = $_stringHelper;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist
        ];
    }

    public function prePersist( LifecycleEventArgs $args ) : void
    {
        $entity = $args->getEntity();
        if( $entity instanceof Affiliate )
        {
            $admin = $args->getEntityManager()->getRepository( Admin::class )->findAll()[0];
            $entity->setAfAdmin($admin);
            $entity->setAfToken($this->stringHelper->randomString(50));
            $entity->setAfActive(true);
        }
    }

}