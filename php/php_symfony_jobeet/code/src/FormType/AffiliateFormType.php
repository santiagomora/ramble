<?php


namespace App\FormType;

use App\Entity\Admin;
use App\Entity\Category;
use App\Manager\RoleManager;
use App\Repository\CategoryRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\Affiliate;

class AffiliateFormType extends AbstractType
{
    private $userRole;

    public function __construct( RoleManager $_roleManager )
    {
        $this->userRole = $_roleManager->getUserRole();
    }

    function getQueryByRole( array $queryParams, string $userRoleName, CategoryRepository $cr )
    {
        $query = null;
        switch($userRoleName)
        {
            case 'ROLE_ADMIN': $query = $cr->indexFormCategoriesByAdmin($queryParams); break;
            case 'ROLE_COMPANY': $query = $cr->indexFormCategoriesByCompany($queryParams); break;
            default:break;
        }
        return $query;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $queryParams = $this->userRole->getIndexParams();
        $userRoleName = $this->userRole->getRoleName();
        $builder
            ->add('afUrl', Type\TextType::class,['label' => 'Afilliate URL'])
            ->add('afEmail', Type\TextType::class,['label' => 'Afilliate Email'])
            ->add('afName', Type\TextType::class,['label' => 'Afilliate Name'])
            ->add('afAdmin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'amName',
                'label' => 'afAdmin'
            ])
            ->add('acCategory', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'caName',
                'multiple' => true,
                'label' => 'afAffiliate',
                'query_builder' => function ( CategoryRepository $cr ) use ($queryParams,$userRoleName){
                    return $this->getQueryByRole( $queryParams,$userRoleName,$cr );
                }
            ])
            ->add('save',Type\SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Affiliate::class,
            'theme' => 'forms/affiliate-category.html.twig'
        ]);
    }
}