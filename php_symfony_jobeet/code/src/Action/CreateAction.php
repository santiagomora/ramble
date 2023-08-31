<?php


namespace App\Action;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Action\BaseAction;
use App\Traits\ActionMethodsTrait;

class CreateAction extends BaseAction
{
    use ActionMethodsTrait;

    private $routeParams = [];

    private $actionSlug = "create";

    public function getActionRouteParams() : array
    {
        return $this->routeParams;
    }

    public function getDisplayOptions() : array
    {
        $url = $this->buildActionRoute();
        return [
            "htmlTag" => "<a class='btn btn-primary' href='$url'>Create</a>",
            "wrapperClasses" => "list-group-item list-group-action"
        ];
    }

    protected function getActionSlug() : string
    {
        return $this->actionSlug;
    }

}