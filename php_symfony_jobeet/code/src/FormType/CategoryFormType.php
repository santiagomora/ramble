<?php

namespace App\FormType;

use App\Entity\Admin;
use App\Entity\Affiliate;
use App\Entity\Category;
use App\Manager\RoleManager;
use App\Repository\AffiliateRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CategoryFormType extends AbstractType
{
    private $userRole;

    public function __construct( RoleManager $_roleManager )
    {
        $this->userRole = $_roleManager->getUserRole();
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $queryParams = $this->userRole->getIndexParams();
        $userRoleName = $this->userRole->getRoleName();
        $builder
            ->add('caName')
            ->add('caAdmin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'amName',
                'label' => 'caAdmin'
            ])
            ->add('acAffiliate', EntityType::class, [
                'class' => Affiliate::class,
                'choice_label' => 'afName',
                'multiple' => true,
                'label' => 'afAffiliate',
                'query_builder' => function ( AffiliateRepository $ar ) use ($queryParams,$userRoleName) {
                    return $userRoleName === 'ROLE_ADMIN'
                        ? $ar->indexFormAffiliatesByAdmin($queryParams)
                        : $ar->indexFormAffiliatesByCompany($queryParams);
                }
            ])
            ->add('save',Type\SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Category::class,
        ]);
    }
}
