<?php

namespace App\Entity;

use App\Contract\EntityInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * Positions
 *
 * @ORM\Table(
 *     name="positions",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="po_name", columns={"po_name","po_admin_id","po_company_id"})
 *     },
 *     indexes={
 *          @ORM\Index( name="po_admin_id", columns={"po_admin_id"})
 *      }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\PositionRepository")
 */
class Position implements EntityInterface
{

    public const ENTITY_SLUG = "positions";

    public const ENTITY_PREFIX = "po";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "poId";

    /**
     * @var int
     *
     * @ORM\Column(name="po_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $poId;

    /**
     * @var string
     *
     * @ORM\Column(name="po_name", type="string", length=50, nullable=false)
     */
    private $poName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="po_description", type="string", length=100, nullable=true)
     */
    private $poDescription;

    /**
     * @var \Admin
     *
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="po_admin_id", referencedColumnName="am_id")
     * })
     */
    private $poAdmin;

    /**
     * @var \Company
     *
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="po_company_id", referencedColumnName="co_id")
     * })
     */
    private $poCompany;

    public function getPoCompany(): ?Company
    {
        return $this->poCompany;
    }

    public function setPoCompany(?Company $poCompany): self
    {
        $this->poCompany =$poCompany;

        return $this;
    }

    public function getPoId(): ?int
    {
        return $this->poId;
    }

    public function getPoName(): ?string
    {
        return $this->poName;
    }

    public function setPoName(string $poName): self
    {
        $this->poName = $poName;

        return $this;
    }

    public function getPoDescription(): ?string
    {
        return $this->poDescription;
    }

    public function setPoDescription(?string $poDescription): self
    {
        $this->poDescription = $poDescription;

        return $this;
    }
    public function getPoAdmin(): ?Admin
    {
        return $this->poAdmin;
    }

    public function setPoAdmin(?Admin $poAdmin): self
    {
        $this->poAdmin =$poAdmin;

        return $this;
    }

    public function getPoAdminName() : string
    {
        return $this->getPoAdmin()->getAmName();
    }

    public function getPoCompanyName() : string
    {
        $company = $this->getPoCompany();
        return is_null($company) ? "" : $company->getCoName();
    }

}
