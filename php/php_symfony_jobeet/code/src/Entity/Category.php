<?php

namespace App\Entity;

use App\Contract\EntityInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Categories
 *
 * @ORM\Table(
 *     name="categories",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="ca_name", columns={"ca_admin_id","ca_name","ca_company_id"})
 *     },
 *     indexes={
 *          @ORM\Index(name="ca_admin_id", columns={"ca_admin_id"})
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Category implements EntityInterface
{
    public const ENTITY_SLUG = "categories";

    public const ENTITY_PREFIX = "ca";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "caId";

    /**
     * @var int
     * @ORM\Column(name="ca_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $caId;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=50,maxMessage = "The category's name exceeds {{ limit }} characters long")
     * @ORM\Column(name="ca_name", type="string", length=50, nullable=false)
     */
    private $caName;

    /**
     * @var \Admin
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ca_admin_id", referencedColumnName="am_id")
     * })
     */
    private $caAdmin;


    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Affiliate", inversedBy="acCategory",cascade={"persist"})
     * @ORM\JoinTable(name="affiliates_categories",
     *   joinColumns={
     *     @ORM\JoinColumn(name="ac_category_id", referencedColumnName="ca_id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="ac_affiliate_id", referencedColumnName="af_id")
     *   }
     * )
     */
    private $acAffiliate;

    /**
     * @var \Category
     *
     * @ORM\OneToMany(targetEntity="Job",mappedBy="jbCategory",fetch="EXTRA_LAZY")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ca_id", referencedColumnName="jb_category_id")
     * })
     * @ORM\OrderBy({"jbCreatedAt" = "DESC"})
     */
    private $caJobs;

    /**
     * @var \Company
     *
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ca_company_id", referencedColumnName="co_id")
     * })
     */
    private $caCompany;

    public function getCaCompany(): ?Company
    {
        return $this->caCompany;
    }

    public function setCaCompany(?Company $caCompany): self
    {
        $this->caCompany =$caCompany;

        return $this;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->acAffiliate = new \Doctrine\Common\Collections\ArrayCollection();
        $this->caJobs = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getCaId(): ?int
    {
        return $this->caId;
    }

    public function getCaName(): ?string
    {
        return $this->caName;
    }

    public function setCaName(string $caName): self
    {
        $this->caName = $caName;

        return $this;
    }

    public function getCaAdmin(): ?Admin
    {
        return $this->caAdmin;
    }

    public function setCaAdmin(?Admin $caAdmin): self
    {
        $this->caAdmin =$caAdmin;

        return $this;
    }

    /**
     * @return Collection|Affiliate[]
     */
    public function getAcAffiliate(): Collection
    {
        return $this->acAffiliate;
    }

    public function addAcAffiliate(Affiliate $acAffiliate): self
    {
        if (!$this->acAffiliate->contains($acAffiliate)) {
            $this->acAffiliate[] = $acAffiliate;
        }

        return $this;
    }

    /**
     * @return Collection|Job[]
     */
    public function getCaJobs( int $offset = null, int $limit = null ): Collection
    {
        return ( isset($offset) && isset($limit) )
            ? new ArrayCollection( $this->caJobs->slice($offset,$limit) )
            : $this->caJobs;
    }

    public function addCaJob(Job $job): self
    {
        if (!$this->caJobs->contains($job)) {
            $this->caJobs[] = $job;
        }

        return $this;
    }

    public function removeAcAffiliate(Affiliate $acAffiliate): self
    {
        $this->acAffiliate->removeElement($acAffiliate);

        return $this;
    }

    public function getCaAdminName() : string
    {
        return $this->caAdmin->getAmName();
    }

    public function getCaCompanyName() : string
    {
        $company = $this->getCaCompany();
        return is_null($company) ? "" : $company->getCoName();
    }

}
