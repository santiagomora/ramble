<?php


namespace App\Action;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Action\BaseAction;
use App\Traits\ActionMethodsTrait;

class DeleteAction extends BaseAction
{
    use ActionMethodsTrait;

    private $routeParams = [ "id" => "get%sId" ]; // esto esta mal?

    private $actionSlug = "delete";

    protected function getActionSlug() : string
    {
        return $this->actionSlug;
    }

    public function getActionRouteParams() : array
    {
        return $this->routeParams;
    }

    public function getDisplayOptions() : array
    {
        $url = $this->buildActionRoute();
        return [
            "htmlTag" => "<a class='btn btn-danger' href='$url'>Delete</a>",
            "wrapperClasses" => "list-group-item list-group-action"
        ];
    }

}