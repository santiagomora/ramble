<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\Extension\RuntimeExtensionInterface;

class InstanceOfExtension implements RuntimeExtensionInterface
{
    /**
     * @param $var
     * @param $instance
     * @return bool
     */
    public function instanceof( $var, string $instance ) : bool
    {
        return  $var instanceof $instance;
    }

}
