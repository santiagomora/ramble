<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\Extension\RuntimeExtensionInterface;

class ReplaceExtension implements RuntimeExtensionInterface
{
    /**
     * @param $var
     * @param $instance
     * @return bool
     */
    public function replace( string $regex, string $replace, string $strTarget ) : string
    {
        return preg_replace($regex,$replace,$strTarget);
    }

}
