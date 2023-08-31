<?php

namespace App\FormType;

use App\Entity\Admin;
use App\Entity\JobType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class JobTypeFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('jtName')
            ->add('jtAdmin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'amName',
                'label' => 'jtAdmin'
            ])
            ->add('save',Type\SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => JobType::class,
        ]);
    }
}
