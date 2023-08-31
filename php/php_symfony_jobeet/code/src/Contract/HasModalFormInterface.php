<?php


namespace App\Contract;

use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormFactoryInterface;

interface HasModalFormInterface
{
    public function getFormOptions() : array;

    public function getModalTitle() : string;

    public function getBuiltForm() : FormView;

    public function setFormFactory( FormFactoryInterface $_formFactory );

    public function getFormTheme() : string;
}