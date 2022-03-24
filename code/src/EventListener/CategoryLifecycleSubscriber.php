<?php

namespace App\EventListener;

use App\Entity\Admin;
use App\Entity\Affiliate;
use App\Entity\Category;
use App\Helper\StringHelper;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class CategoryLifecycleSubscriber implements EventSubscriber
{
    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist
        ];
    }

    public function prePersist( LifecycleEventArgs $args ) : void
    {
        $entity = $args->getEntity();
        if( $entity instanceof Category )
        {
            $entity = $args->getEntity();
            $admin = $args->getEntityManager()->getRepository( Admin::class )->findAll()[0];
            $entity->setCaAdmin($admin);
        }
    }

}