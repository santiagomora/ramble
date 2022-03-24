<?php

namespace App\Entity;

use App\Contract\EntityInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Role\RoleCompany;
/**
 * Companies
 *
 * @ORM\Table(
 *     name="companies",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="co_api_token", columns={"co_api_token"}),
 *          @ORM\UniqueConstraint(name="co_email", columns={"co_email"})},
 *          indexes={
 *              @ORM\Index(name="co_admin_id", columns={"co_admin_id"})
*           }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CompanyRepository")
 */
class Company implements UserInterface,EntityInterface
{
    public const USER_SLUG = "company";

    public const ENTITY_SLUG = "companies";

    public const ENTITY_PREFIX = "co";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "coId";

    /**
     * @var int
     *
     * @ORM\Column(name="co_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $coId;

    /**
     * @var string
     *
     * @ORM\Column(name="co_logo", type="string", length=150, nullable=false)
     */
    private $coLogo;

    /**
     * @var string
     *
     * @ORM\Column(name="co_name", type="string", length=150, nullable=false)
     */
    private $coName;

    /**
     * @var string
     *
     * @ORM\Column(name="co_api_token", type="string", length=255, nullable=false)
     */
    private $coApiToken;

    /**
     * @var string
     *
     * @ORM\Column(name="co_email", type="string", length=150, nullable=false)
     */
    private $coEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="co_password", type="string", length=255, nullable=false)
     */
    private $coPassword;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="co_created_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $coCreatedAt;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="co_updated_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $coUpdatedAt;

    /**
     * @var \Admin
     *
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="co_admin_id", referencedColumnName="am_id")
     * })
     */
    private $coAdmin;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(targetEntity="Job", mappedBy="jbCompany")
     */
    private $coJobs;

    private $coRole;

    public function getCoRole(): ?RoleCompany
    {
        return $this->coRole;
    }

    public function setCoRole(RoleCompany $coRole): self
    {
        $this->coRole = $coRole;

        return $this;
    }

    public function getCoJobs() :Collection
    {
        return $this->coPositions;
    }

    public function setCoJobs( Collection $coJobs ) : self
    {
        $this->coJobs = $coJobs;
        return $this;
    }

    public function getCoId(): ?int
    {
        return $this->coId;
    }

    public function getCoLogo(): ?string
    {
        return $this->coLogo;
    }

    public function setCoLogo(string $coLogo): self
    {
        $this->coLogo = $coLogo;

        return $this;
    }

    public function getCoName(): ?string
    {
        return $this->coName;
    }

    public function setCoName(string $coName): self
    {
        $this->coName = $coName;

        return $this;
    }

    public function getCoApiToken(): ?string
    {
        return $this->coApiToken;
    }

    public function setCoApiToken(string $coApiToken): self
    {
        $this->coApiToken = $coApiToken;

        return $this;
    }

    public function getCoEmail(): ?string
    {
        return $this->coEmail;
    }

    public function setCoEmail(string $coEmail): self
    {
        $this->coEmail = $coEmail;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->coPassword;
    }

    public function setPassword(string $coPassword): self
    {
        $this->coPassword = $coPassword;

        return $this;
    }

    public function getCoPassword(): ?string
    {
        return $this->getPassword();
    }

    public function setCoPassword(string $coPassword): self
    {
        return $this->setPassword($coPassword);
    }

    public function getCoCreatedAt(): ?\DateTimeInterface
    {
        return $this->coCreatedAt;
    }

    public function setCoCreatedAt(?\DateTimeInterface $coCreatedAt): self
    {
        $this->coCreatedAt = $coCreatedAt;

        return $this;
    }

    public function getCoUpdatedAt(): ?\DateTimeInterface
    {
        return $this->coUpdatedAt;
    }

    public function setCoUpdatedAt(?\DateTimeInterface $coUpdatedAt): self
    {
        $this->coUpdatedAt = $coUpdatedAt;

        return $this;
    }

    public function getCoAdmin(): ?Admin
    {
        return $this->coAdmin;
    }

    public function setCoAdmin(?Admin $coAdmin): self
    {
        $this->coAdmin = $coAdmin;

        return $this;
    }

    /* User interface methods*/
    public function getSalt()
    {
        return null;
    }

    public function getUsername()
    {
        // TODO: Implement getUsername() method.
        return $this->coEmail;
    }

    public function getRoles()
    {
        // TODO: Implement getRoles() method.
        return ['ROLE_COMPANY'];
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function getCoAdminName()
    {
        return $this->coAdmin->getAmName();
    }

}
