<?php

namespace App\Entity;

use App\Contract\AppliedActionInterface;
use App\Contract\EntityInterface;
use App\Traits\ActionEntityMethodsTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Affiliates
 *
 * @ORM\Table(
 *     name="affiliates",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="unique_affiliate", columns={"af_name","af_url","af_email"})
 *     },
 *     indexes={
 *          @ORM\Index(name="af_admin_id", columns={"af_admin_id"})
 *      }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\AffiliateRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Affiliate implements EntityInterface
{

    public const ENTITY_SLUG = "affiliates";

    public const ENTITY_PREFIX = "af";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "afId";

    /**
     * @var int
     *
     * @ORM\Column(name="af_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $afId;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=100,maxMessage = "The affiliate's name exceeds {{ limit }} characters long")
     * @ORM\Column(name="af_url", type="string", length=100, nullable=false)
     */
    private $afUrl;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=100,maxMessage = "The affiliate's email:{{value}} exceeds {{ limit }} characters long")
     * @Assert\Email(message = "The email {{ value }} is not a valid email.",checkMX = true)
     * @ORM\Column(name="af_email", type="string", length=100, nullable=false)
     */
    private $afEmail;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=100,maxMessage = "The affiliate's name:{{value}} exceeds {{ limit }} characters long")
     * @ORM\Column(name="af_name", type="string", length=100, nullable=false)
     */
    private $afName;

    /**
     * @var string
     * @ORM\Column(name="af_token", type="string", length=150, nullable=false)
     */
    private $afToken;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="af_created_at", type="datetime", nullable=true)
     */
    private $afCreatedAt;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="af_updated_at", type="datetime", nullable=true)
     */
    private $afUpdatedAt;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="af_active", type="boolean", nullable=true)
     */
    private $afActive;

    /**
     * @var \Admin
     *
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="af_admin_id", referencedColumnName="am_id")
     * })
     */
    private $afAdmin;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Category", mappedBy="acAffiliate")
     */
    private $acCategory;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->acCategory = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getAfId(): ?int
    {
        return $this->afId;
    }

    public function getAfUrl(): ?string
    {
        return $this->afUrl;
    }

    public function setAfUrl(string $afUrl): self
    {
        $this->afUrl = $afUrl;

        return $this;
    }

    public function getAfEmail(): ?string
    {
        return $this->afEmail;
    }

    public function setAfEmail(string $afEmail): self
    {
        $this->afEmail = $afEmail;

        return $this;
    }

    public function getAfName(): ?string
    {
        return $this->afName;
    }

    public function setAfName(string $afName): self
    {
        $this->afName = $afName;

        return $this;
    }

    public function getAfToken(): ?string
    {
        return $this->afToken;
    }

    public function setAfToken(string $afToken): self
    {
        $this->afToken = $afToken;

        return $this;
    }

    public function getAfCreatedAt(): ?\DateTimeInterface
    {
        return $this->afCreatedAt;
    }

    public function setAfCreatedAt(?\DateTimeInterface $afCreatedAt): self
    {
        $this->afCreatedAt = $afCreatedAt;

        return $this;
    }

    public function getAfUpdatedAt(): ?\DateTimeInterface
    {
        return $this->afUpdatedAt;
    }

    public function setAfUpdatedAt(?\DateTimeInterface $afUpdatedAt): self
    {
        $this->afUpdatedAt = $afUpdatedAt;

        return $this;
    }

    public function getAfActive(): ?bool
    {
        return $this->afActive;
    }

    public function setAfActive(?bool $afActive): self
    {
        $this->afActive = $afActive;

        return $this;
    }

    public function getAfAdmin(): ?Admin
    {
        return $this->afAdmin;
    }

    public function setAfAdmin(?Admin $afAdmin): self
    {
        $this->afAdmin = $afAdmin;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getAcCategory(): Collection
    {
        return $this->acCategory;
    }

    public function addAcCategory(Category $acCategory): self
    {
        if (!$this->acCategory->contains($acCategory)) {
            $this->acCategory[] = $acCategory;
            $acCategory->addAcAffiliate($this);
        }

        return $this;
    }

    public function removeAcCategory(Category $acCategory): self
    {
        if ($this->acCategory->removeElement($acCategory)) {
            $acCategory->removeAcAffiliate($this);
        }

        return $this;
    }

    public function getAfAdminName() : string
    {
        return $this->afAdmin->getAmName();
    }

}
