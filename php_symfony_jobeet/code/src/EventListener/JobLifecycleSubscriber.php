<?php

namespace App\EventListener;

use App\Entity\Admin;
use App\Entity\Job;
use App\Helper\StringHelper;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Doctrine\ORM\Events;
use Symfony\Component\Routing\Generator\UrlGenerator;

class JobLifecycleSubscriber implements EventSubscriber
{
    /*
     * @property EntityFileManager $fileManager injected as a service
     * */
    public $fileManager;

    public $urlGenerator;

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

    private function storeFiles(Job $job): void
    {
        $pathInfo = $this
            ->fileManager
            ->getFileInfo( $job->getJbLogo() );

        $finalName = $job->getJbCreatedAt()->format("YmdHiv").'-jobLogo.'.$pathInfo['extension'];
        $finalDir = '/jobs/logos';
        $originalFile = $pathInfo['original'];

        $finalDest = $this
            ->fileManager
            ->storeFile( $originalFile,$finalDir,$finalName  );

        $job->setJbLogo($finalDest);
    }

    private function storeDefault(Job $job): void
    {
        $admin = $args
            ->getEntityManager()
            ->getRepository( Admin::class )
            ->findAll()[0];

        $job->setJbAdmin($admin);

        $token = is_null( $job->getJbCompany() )
            ? $this->stringHelper->randomString(50)
            : '';

        $job->setJbActivated(true);
        $job->setJbToken($token);
    }

    public function prePersist( LifecycleEventArgs $args ) : void
    {
        $entity = $args->getEntity();
        if ($entity instanceof Job)
        {
            $this->storeFiles( $entity );
            $this->storeDefault( $entity );
        }
    }

}