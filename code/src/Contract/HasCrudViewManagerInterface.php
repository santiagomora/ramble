<?php


namespace App\Contract;

use App\Action\BaseAction;
use App\Contract\EntityInterface;

interface HasCrudViewManagerInterface
{
    public function getDefaultRedirectAfterSubmit() : string;
}