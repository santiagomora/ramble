<?php


// src/Twig/AppExtension.php
namespace App\Twig;

use App\Twig\InstanceOfExtension;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig\TwigTest;

class AppTestExtensions extends AbstractExtension
{
    public function getTests() : array
    {
        return [
            new TwigTest('instanceof', [InstanceOfExtension::class, 'instanceof']),
            new TwigTest('matches', [MatchExtension::class, 'matches'])
        ];
    }
    public function getFunctions() : array
    {
        return [
            new TwigFunction('replace', [ReplaceExtension::class, 'replace'])
        ];
    }
}
