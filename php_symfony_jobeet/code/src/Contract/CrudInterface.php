<?php


namespace App\Contract;

use App\Action\BaseAction;
use App\Contract\EntityInterface;

interface CrudInterface
{

    public function getEntityInstance( ?int $id ) : EntityInterface;

    public function getRedirectAfterCreateRouteName( EntityInterface $entity ) : array;

    public function getRedirectAfterEditRouteName( EntityInterface $entity ) : array;

    public function getEntityForm() : string;

    public function getSingleViewName() : string;

    public function getEntityIndex() : array;

    public function getActions( string $currentActionSlug ) : array;

    public function getFormViewName(): string;

    public function getIndexViewName() : string;

    public function getIndexTableInfo() : array;

    public function getSingleAction( string $actionName ) : array;
}