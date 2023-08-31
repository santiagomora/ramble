<?php


namespace App\Filter;


use App\Entity\Category;
use App\Entity\Company;
use App\Entity\JobType;
use App\Entity\Position;
use Doctrine\Common\Collections\Collection;

class JobFilter
{
    private $categories;

    private $positions;

    private $jobTypes;

    private $companies;

    public function __construct()
    {
        $this->categories = new \Doctrine\Common\Collections\ArrayCollection();
        $this->positions = new \Doctrine\Common\Collections\ArrayCollection();
        $this->jobTypes = new \Doctrine\Common\Collections\ArrayCollection();
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

    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategories(Category $_category): self
    {
        if (!$this->categories->contains($_category)) {
            $this->categories[] = $_category;
        }

        return $this;
    }

    public function getPositions(): Collection
    {
        return $this->positions;
    }

    public function addPositions(Position $_position): self
    {
        if (!$this->companies->contains($_position)) {
            $this->positions[] = $_position;
        }

        return $this;
    }

    public function getJobTypes(): Collection
    {
        return $this->jobTypes;
    }

    public function addJobTypes(JobType $_jobType): self
    {
        if (!$this->jobTypes->contains($_jobType)) {
            $this->jobTypes[] = $_jobType;
        }

        return $this;
    }
}