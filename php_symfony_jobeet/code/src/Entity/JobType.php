<?php

namespace App\Entity;

use App\Contract\EntityInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * JobTypes
 *
 * @ORM\Table(
 *     name="job_types",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint( name="jt_name", columns={"jt_name","jt_admin_id","jt_company_id"})},
 *     indexes={
 *          @ORM\Index( name="jt_admin_id", columns={"jt_admin_id"})
 *      }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\JobTypeRepository")
 */
class JobType implements EntityInterface
{

    public const ENTITY_SLUG = "jobtypes";

    public const ENTITY_PREFIX = "jt";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "jtId";

    /**
     * @var int
     *
     * @ORM\Column(name="jt_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $jtId;

    /**
     * @var string
     *
     * @ORM\Column(name="jt_name", type="string", length=40, nullable=false)
     */
    private $jtName;

    /**
     * @var \Admin
     *
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="jt_admin_id", referencedColumnName="am_id")
     * })
     */
    private $jtAdmin;

    /**
     * @var \Company
     *
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="jt_company_id", referencedColumnName="co_id")
     * })
     */
    private $jtCompany;

    public function getJtCompany(): ?Company
    {
        return $this->jtCompany;
    }

    public function setJtCompany(?Company $jtCompany): self
    {
        $this->jtCompany =$jtCompany;

        return $this;
    }

    public function getJtId(): ?int
    {
        return $this->jtId;
    }

    public function getJtName(): ?string
    {
        return $this->jtName;
    }

    public function setJtName(string $jtName): self
    {
        $this->jtName = $jtName;

        return $this;
    }

    public function getJtAdmin(): ?Admin
    {
        return $this->jtAdmin;
    }

    public function setJtAdmin(?Admin $jtAdmin): self
    {
        $this->jtAdmin =$jtAdmin;

        return $this;
    }

    public function getJtAdminName() : string
    {
        return $this->getJtAdmin()->getAmName();
    }

    public function getJtCompanyName() : string
    {
        $company = $this->getJtCompany();
        return is_null($company) ? "" : $company->getCoName();
    }

}
