<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\Extension\RuntimeExtensionInterface;

class MatchExtension implements RuntimeExtensionInterface
{
    /**
     * @param $var
     * @param $instance
     * @return bool
     */
    public function matches( string $strTarget,string $regex ) : bool
    {
        return preg_match($regex,$strTarget);
    }

}
