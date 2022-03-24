<?php


namespace App\Filter;

use App\Entity\Company;
use Doctrine\Common\Collections\Collection;

class CategoryFilter
{
    private $companies;

    public function __construct()
    {
        $this->companies = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getCompanies(): Collection
    {
        return $this->companies;
    }

    public function addCompanies(Company $_company): self
    {
        if (!$this->companies->contains($_company)) {
            $this->companies[] = $_company;
        }

        return $this;
    }
}