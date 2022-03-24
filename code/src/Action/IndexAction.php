<?php


namespace App\Action;

use App\Action\BaseAction;
use App\Traits\ActionMethodsTrait;

class IndexAction extends BaseAction
{
    use ActionMethodsTrait;

    private $routeParams = [];

    private $actionSlug = "index";

    protected function getActionSlug() : string
    {
        return $this->actionSlug;
    }

    protected function getActionRouteParams(): array
    {
        return $this->routeParams;
    }

    public function getDisplayOptions() : array
    {
        $url = $this->buildActionRoute();
        return [
            "htmlTag" => "<a class='btn btn-primary' href='$url'>Index</a>",
            "wrapperClasses" => "list-group-item list-group-action"
        ];
    }

}