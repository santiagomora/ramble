<?php

namespace App\FormType;

use App\Entity\Admin;
use App\Entity\Company;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type;

class CompanyFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $now = new \DateTime();
        $builder
            ->add('coLogo')
            ->add('coName')
            ->add('coApiToken',Type\HiddenType::class)
            ->add('coEmail')
            ->add('coPassword')
            ->add('coCreatedAt',Type\DateTimeType::class,[
                'empty_data' => null
            ])
            ->add('coUpdatedAt',Type\DateTimeType::class,[
                'empty_data' => null
            ])
            ->add('coAdmin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'amName',
                'label' => 'coAdmin'
            ])
            ->add('save',Type\SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Company::class,
        ]);
    }
}
