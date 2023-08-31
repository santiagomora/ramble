<?php

namespace App\Entity;

use App\Contract\EntityInterface;
use App\Contract\HasFilesInterface;
use App\Traits\StringHelperTrait;
use Doctrine\DBAL\Schema\View;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Event\LifecycleEventArgs;

/**
 * Jobs
 *
 * @ORM\Table(
 *     name="jobs",
 *     indexes={
 *          @ORM\Index(name="jb_position_id", columns={"jb_position_id"}),
 *          @ORM\Index(name="jb_type_id", columns={"jb_type_id"}),
 *          @ORM\Index(name="jb_company_id", columns={"jb_company_id"}),
 *          @ORM\Index(name="jb_admin_id", columns={"jb_admin_id"}),
 *          @ORM\Index(name="jb_category_id", columns={"jb_category_id"})
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\JobRepository")
 * @ORM\NamedNativeQueries({
 *      @ORM\NamedNativeQuery(
 *          name                = "getJobsByCategory",
 *          resultSetMapping    = "mapJobsByCategoryNativeQuery",
 *          resultClass         = "__CLASS__",
 *          query               = "
               select * from (
                    select *, row_number() over (
                        partition by jb_category_id
                        order by jb_created_at desc
                    ) as row
                    from jobs jb
                    join positions po
                    on jb_position_id=po_id
                    join categories ca
                    on jb_category_id=ca_id
                ) rs where row <= :limit
                "
 *      )
 * })
 * @ORM\SqlResultSetMappings({
 *      @ORM\SqlResultSetMapping(
 *          name="mapJobsByCategoryNativeQuery",
 *          entities= {
 *              @ORM\EntityResult(entityClass = "Category"),
 *              @ORM\EntityResult(entityClass = "Position")
 *          }
 *      )
 * })
 *  @ORM\HasLifecycleCallbacks
 */
class Job implements EntityInterface
{
    public const ENTITY_SLUG = "jobs";

    public const ENTITY_PREFIX = "jb";

    public const ENTITY_CLASS = __CLASS__;

    public const ENTITY_ID_FIELDNAME = "jbId";

    private $fileStorageDir = '/jobs';

    /**
     * @var int
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @ORM\Column(name="jb_id",type="integer",nullable=false)
     */
    private $jbId;

    /**
     * @var string
     * @Assert\Length(max=50,min=1,minMessage = "The company name must be at least {{ limit }} characters long", maxMessage = "The company name must be longer than {{ limit }} characters")
     * @ORM\Column(name="jb_company_name",type="string",length=50,nullable=false)
     */
    private $jbCompanyName;

    /**
     * @var string
     * @Assert\NotBlank(message="the logo cant be blank")
     * @Assert\Length(max=150,maxMessage = "The logo name exceeds {{ limit }} characters long")
     * @Assert\File(
     *     mimeTypes={"image/jpg","image/png","image/jpeg","image/gif"},
     *     maxSize="1M",
     *     mimeTypesMessage="The logo {{name}} type is not valid. Expected {{types}} got {{type}}",
     *     maxSizeMessage="The logo: {{name}} is too large ({{ size }} {{ suffix }}). Allowed maximum size is {{ limit }} {{ suffix }}."
     * )
     * @ORM\Column(name="jb_logo",type="string",length=150,nullable=false)
     */
    private $jbLogo;

    /**
     * @var string
     * @Assert\NotBlank(message="Please upload a URL")
     * @Assert\Length(max=255,maxMessage = "The URL name exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_url",type="string",length=255,nullable=false)
     */
    private $jbUrl;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=100,maxMessage = "The Title exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_title",type="string",length=100,nullable=false)
     */
    private $jbTitle;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=150,maxMessage = "The Location exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_location",type="string",length=150,nullable=false)
     */
    private $jbLocation;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=65535,maxMessage = "The Description exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_description",type="text",length=65535,nullable=false)
     */
    private $jbDescription;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=65535,maxMessage = "The Instructions exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_instructions",type="text",length=65535,nullable=false)
     */
    private $jbInstructions;

    /**
     * @var string
     * @Assert\Length(max=150,maxMessage = "The token exceeds {{ limit }} characters long")
     * @ORM\Column(name="jb_token",type="string",length=150,nullable=false)
     */
    private $jbToken;

    /**
     * @var bool
     * @ORM\Column(name="jb_public",type="boolean")
     */
    private $jbPublic;

    /**
     * @var bool
     * @ORM\Column(name="jb_activated",type="boolean",nullable=false)
     */
    private $jbActivated;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Length(max=150,maxMessage = "The contact email exceeds {{ limit }} characters long")
     * @Assert\Email(message = "The email '{{ value }}' is not a valid email.",checkMX = true)
     * @ORM\Column(name="jb_email",type="string",length=150,nullable=false)
     */
    private $jbEmail;

    /**
     * @var \DateTime
     * @Assert\DateTime
     * @ORM\Column(name="jb_expires_at",type="datetime",nullable=false)
     */
    private $jbExpiresAt;

    /**
     * @var \DateTime|null
     * @Assert\DateTime
     * @ORM\Column(name="jb_created_at",type="datetime",nullable=true)
     */
    private $jbCreatedAt;

    /**
     * @var \DateTime|null
     * @Assert\DateTime
     * @ORM\Column(name="jb_updated_at",type="datetime",nullable=true)
     */
    private $jbUpdatedAt;

    /**
     * @var \Category
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="Category",inversedBy="caJobs")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="jb_category_id",referencedColumnName="ca_id")
     * })
     */
    private $jbCategory;

    /**
     * @var \JobType
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="JobType")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="jb_type_id",referencedColumnName="jt_id")
     * })
     */
    private $jbType;

    /**
     * @var \Company
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="jb_company_id",referencedColumnName="co_id")
     * })
     */
    private $jbCompany;

    /**
     * @var \Admin
     * @ORM\ManyToOne(targetEntity="Admin")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="jb_admin_id",referencedColumnName="am_id")
     * })
     */
    private $jbAdmin;

    /**
     * @var \Position
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="Position",fetch="EAGER")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="jb_position_id",referencedColumnName="po_id")
     * })
     */
    private $jbPosition;

    public function getJbId(): ?int
    {
        return $this->jbId;
    }

    public function getJbCompanyName(): ?string
    {
        return $this->jbCompanyName;
    }

    public function setJbCompanyName(string $jbCompanyName): self
    {
        $this->jbCompanyName = $jbCompanyName;

        return $this;
    }

    public function getJbLogo(): ?string
    {
        return $this->jbLogo;
    }

    public function setJbLogo(string $jbLogo): self
    {
        $this->jbLogo = $jbLogo;

        return $this;
    }

    public function getJbUrl(): ?string
    {
        return $this->jbUrl;
    }

    public function setJbUrl(string $jbUrl): self
    {
        $this->jbUrl = $jbUrl;

        return $this;
    }

    public function getJbTitle(): ?string
    {
        return $this->jbTitle;
    }

    public function setJbTitle(string $jbTitle): self
    {
        $this->jbTitle = $jbTitle;

        return $this;
    }

    public function getJbLocation(): ?string
    {
        return $this->jbLocation;
    }

    public function setJbLocation(string $jbLocation): self
    {
        $this->jbLocation = $jbLocation;

        return $this;
    }

    public function getJbDescription(): ?string
    {
        return $this->jbDescription;
    }

    public function setJbDescription(string $jbDescription): self
    {
        $this->jbDescription = $jbDescription;

        return $this;
    }

    public function getJbInstructions(): ?string
    {
        return $this->jbInstructions;
    }

    public function setJbInstructions(string $jbInstructions): self
    {
        $this->jbInstructions = $jbInstructions;

        return $this;
    }

    public function getJbToken(): ?string
    {
        return $this->jbToken;
    }

    public function setJbToken(string $jbToken): self
    {
        $this->jbToken = $jbToken;

        return $this;
    }

    public function getJbPublic(): ?bool
    {
        return $this->jbPublic;
    }

    public function setJbPublic(?bool $jbPublic): self
    {
        $this->jbPublic = $jbPublic;

        return $this;
    }

    public function getJbActivated(): ?bool
    {
        return $this->jbActivated;
    }

    public function setJbActivated(?bool $jbActivated): self
    {
        $this->jbActivated = $jbActivated;

        return $this;
    }

    public function getJbEmail(): ?string
    {
        return $this->jbEmail;
    }

    public function setJbEmail(string $jbEmail): self
    {
        $this->jbEmail = $jbEmail;

        return $this;
    }

    public function getJbExpiresAt(): ?\DateTimeInterface
    {
        return $this->jbExpiresAt;
    }

    public function setJbExpiresAt(?\DateTimeInterface $jbExpiresAt): self
    {
        $this->jbExpiresAt = $jbExpiresAt;

        return $this;
    }

    public function getJbCreatedAt(): ?\DateTimeInterface
    {
        return $this->jbCreatedAt;
    }

    public function setJbCreatedAt(?\DateTimeInterface $jbCreatedAt): self
    {
        $this->jbCreatedAt = $jbCreatedAt;

        return $this;
    }

    public function getJbUpdatedAt(): ?\DateTimeInterface
    {
        return $this->jbUpdatedAt;
    }

    public function setJbUpdatedAt(?\DateTimeInterface $jbUpdatedAt): self
    {
        $this->jbUpdatedAt = $jbUpdatedAt;

        return $this;
    }

    public function getJbCategory(): ?Category
    {
        return $this->jbCategory;
    }

    public function setJbCategory(?Category $jbCategory): self
    {
        $this->jbCategory = $jbCategory;

        return $this;
    }

    public function getJbType(): ?JobType
    {
        return $this->jbType;
    }

    public function setJbType(?JobType $jbType): self
    {
        $this->jbType = $jbType;

        return $this;
    }

    public function getJbCompany(): ?Company
    {
        return $this->jbCompany;
    }

    public function setJbCompany(?Company $jbCompany): self
    {
        $this->jbCompany = $jbCompany;

        return $this;
    }

    public function getJbAdmin(): ?Admin
    {
        return $this->jbAdmin;
    }

    public function setJbAdmin(?Admin $jbAdmin): self
    {
        $this->jbAdmin = $jbAdmin;

        return $this;
    }

    public function getJbPosition(): ?Position
    {
        return $this->jbPosition;
    }

    public function setJbPosition(?Position $jbPosition): self
    {
        $this->jbPosition = $jbPosition;

        return $this;
    }

    public function getJbPositionInfo( $getterName ){
        return $this->getJbPosition()->{$getterName}();
    }

    public function keyByCategoryName() : string
    {
        return $this->jbCategory->getCaName();
    }

    public function getJbCategoryName() :string
    {
        return $this->getJbCategory()->getCaName();
    }

    public function getJbJobTypeName() :string
    {
        return $this->getJbType()->getJtName();
    }
}
