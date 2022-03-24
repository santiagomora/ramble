<?php


namespace App\FormType;

use App\Entity\Company;
use App\Filter\CategoryFilter;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type;

class CategoryFilterFormType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('companies', EntityType::class, [
                'class' => Company::class,
                'choice_label' => 'coName',
                'multiple' => true,
                'label' => 'Company',
                'required'=>false
            ])
            ->add('filter',Type\SubmitType::class);

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => CategoryFilter::class,
        ]);
    }
}