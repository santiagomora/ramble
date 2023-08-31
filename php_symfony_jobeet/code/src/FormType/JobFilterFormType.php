<?php


namespace App\FormType;

use App\Entity\Category;
use App\Entity\Company;
use App\Entity\JobType;
use App\Entity\Position;
use App\Filter\JobFilter;
use App\Repository\CategoryRepository;
use App\Repository\PositionRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type;

class JobFilterFormType extends AbstractType
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
            ->add('categories', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'caName',
                'multiple' => true,
                'label' => 'Category',
                'required'=>false
            ])
            ->add('jobtypes', EntityType::class, [
                'class' => JobType::class,
                'choice_label' => 'jtName',
                'multiple' => true,
                'label' => 'Job Type',
                'required'=>false
            ])
            ->add('positions', EntityType::class, [
                'class' => Position::class,
                'choice_label' => 'poName',
                'multiple' => true,
                'label' => 'Position',
                'required'=>false
            ])
            ->add('filter',Type\SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => JobFilter::class
        ]);
    }
}