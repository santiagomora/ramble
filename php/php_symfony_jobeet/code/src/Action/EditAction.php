<?php


namespace App\Action;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Action\BaseAction;
use App\Traits\ActionMethodsTrait;

class EditAction extends BaseAction
{
    use ActionMethodsTrait;

    private $routeParams = [ "id" => "get%sId"]; // esto esta mal?

    private $actionSlug = "edit";

    protected function getActionSlug() : string
    {
        return $this->actionSlug;
    }

    protected function getActionRouteParams() : array
    {
        return $this->routeParams;
    }

    public function getDisplayOptions() : array
    {
        $url = $this->buildActionRoute();
        return [
            "htmlTag" => "<a class='btn btn-primary' href='$url'>Edit</a>",
            "wrapperClasses" => "list-group-item list-group-action"
        ];
    }

}