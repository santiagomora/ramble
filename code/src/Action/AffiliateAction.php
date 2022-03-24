<?php


namespace App\Action;

use App\Entity\Affiliate;
use App\FormType\AffiliateFormType;
use App\Traits\ActionMethodsTrait;
use App\Action\BaseAction;
use App\Contract\HasModalFormInterface;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormFactoryInterface;

class AffiliateAction extends BaseAction implements HasModalFormInterface
{
    use ActionMethodsTrait;

    private $routeParams = [ "id" => "get%sId"];

    private $formFactory;

    private $formTheme = 'crud/forms/create-edit-affiliates.html.twig';

    private $actionSlug = "affiliate";

    protected function getActionRouteParams(): array
    {
        return $this->routeParams;
    }

    protected function getActionSlug() : string
    {
        return $this->actionSlug;
    }

    public function getDisplayOptions() : array
    {
        return [
            "htmlTag" => "<button class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Affiliate</button>",
            "wrapperClasses" => "list-group-item list-group-action"
        ];
    }

    public function getFormOptions() : array
    {
        return [
            'method' => 'POST',
            'action' => $this->buildActionRoute([])
        ];
    }

    public function getModalTitle() : string
    {
        return "Affiliate to ".$this->entity->getCaName();
    }

    public function getFormTheme() : string
    {
        return $this->formTheme;
    }

    public function setFormFactory( FormFactoryInterface $_formFactory ) : self
    {
        $this->formFactory = $_formFactory;
        return $this;
    }

    public function getBuiltForm() : FormView
    {
        return $this->formFactory
            ->create( AffiliateFormType::class, new Affiliate(), $this->getFormOptions() )
            ->createView();
    }

}