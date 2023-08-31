<?php

namespace App\Entity;

use App\Contract\AppliedActionInterface;
use App\Contract\EntityInterface;
use App\Traits\ActionEntityMethodsTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Role\RoleAdmin;

/**
 * Admin
 *
 * @ORM\Table(
 *     name="admin",
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="am_api_token",columns={"am_api_token"}),
 *          @ORM\UniqueConstraint(name="am_email",columns={"am_email"})
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\AdminRepository")
 */
class Admin implements UserInterface
{
    public const USER_SLUG = "admin";

    public const ENTITY_SLUG = "admin";

    public const ENTITY_PREFIX = "am";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "amId";

    /**
     * @var int
     *
     * @ORM\Column(name="am_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $amId;

    /**
     * @var string
     *
     * @ORM\Column(name="am_logo", type="string", length=150, nullable=false)
     */
    private $amLogo;

    /**
     * @var string
     *
     * @ORM\Column(name="am_name", type="string", length=150, nullable=false)
     */
    private $amName;

    /**
     * @var string
     *
     * @ORM\Column(name="am_api_token", type="string", length=255, nullable=false)
     */
    private $amApiToken;

    /**
     * @var string
     *
     * @ORM\Column(name="am_email", type="string", length=150, nullable=false)
     */
    private $amEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="am_password", type="string", length=255, nullable=false)
     */
    private $amPassword;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="am_created_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $amCreatedAt = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="am_updated_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $amUpdatedAt = 'CURRENT_TIMESTAMP';

    private $amRole;

    public function getAmRole(): ?RoleAdmin
    {
        return $this->amRole;
    }

    public function setAmRole(RoleAdmin $amRole): self
    {
        $this->amRole = $amRole;

        return $this;
    }

    public function getAmId(): ?int
    {
        return $this->amId;
    }

    public function getAmLogo(): ?string
    {
        return $this->amLogo;
    }

    public function setAmLogo(string $amLogo): self
    {
        $this->amLogo = $amLogo;

        return $this;
    }

    public function getAmName(): ?string
    {
        return $this->amName;
    }

    public function setAmName(string $amName): self
    {
        $this->amName = $amName;

        return $this;
    }

    public function getAmApiToken(): ?string
    {
        return $this->amApiToken;
    }

    public function setAmApiToken(string $amApiToken): self
    {
        $this->amApiToken = $amApiToken;

        return $this;
    }

    public function getAmEmail(): ?string
    {
        return $this->amEmail;
    }

    public function setAmEmail(string $amEmail): self
    {
        $this->amEmail = $amEmail;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->amPassword;
    }

    public function setPassword(string $amPassword): self
    {
        $this->amPassword = $amPassword;

        return $this;
    }

    public function getAmCreatedAt(): ?\DateTimeInterface
    {
        return $this->amCreatedAt;
    }

    public function setAmCreatedAt(?\DateTimeInterface $amCreatedAt): self
    {
        $this->amCreatedAt = $amCreatedAt;

        return $this;
    }

    public function getAmUpdatedAt(): ?\DateTimeInterface
    {
        return $this->amUpdatedAt;
    }

    public function setAmUpdatedAt(?\DateTimeInterface $amUpdatedAt): self
    {
        $this->amUpdatedAt = $amUpdatedAt;

        return $this;
    }

    /* User interface methods*/
    public function getSalt()
    {
        return null;
    }

    public function getUsername()
    {
        return $this->amEmail;
    }

    public function getRoles()
    {
        return ['ROLE_ADMIN'];
    }

    public function eraseCredentials()
    {
    }

}