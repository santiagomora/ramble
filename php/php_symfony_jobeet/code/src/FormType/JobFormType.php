<?php

namespace App\FormType;

use App\Entity\Category;
use App\Entity\Job;
use App\Entity\JobType;
use App\Entity\Position;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class JobFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $now = new \DateTime();
        $builder
            ->add('jbCompanyName',Type\TextType::class,['label' => 'Company Name'])
            ->add('jbLogo',Type\FileType::class,['label' => 'Job Logo'])
            ->add('jbUrl',Type\TextType::class,['label' => 'Job URL'])
            ->add('jbTitle',Type\TextType::class,['label' => 'Job Title'])
            ->add('jbLocation',Type\TextType::class,['label' => 'Job Location'])
            ->add('jbDescription',Type\TextareaType::class,['label' => 'Job Description'])
            ->add('jbInstructions',Type\TextareaType::class,['label' => 'Job Instructions'])
            ->add('jbEmail',Type\TextType::class,['label' => 'Job Contact email'])
            ->add('jbExpiresAt',Type\DateTimeType::class,[
                'label' => 'Job Expiration Date'
            ])
            ->add('jbCreatedAt',Type\HiddenType::class,[
                'empty_data' => $now
            ])
            ->add('jbUpdatedAt',Type\HiddenType::class,[
                'empty_data' => $now
            ])
            ->add('jbPublic',Type\CheckboxType::class,[
                'label'=>'Publishable on other sites',
                'required' => false,
                'false_values' => [null]
            ])
            ->add('jbCategory', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'caName',
                'label' => 'Job Category'
            ])
            ->add('jbType', EntityType::class, [
                'class' => JobType::class,
                'choice_label' => 'jtName',
                'label' => 'Job Type'
            ])
            ->add('jbPosition',EntityType::class, [
                'class' => Position::class,
                'choice_label' => 'poName',
                'label' => 'Job Position'
            ])
            ->add('save',Type\SubmitType::class);

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Job::class,
            'theme' => 'forms/create-edit-job.html.twig'
        ]);
    }
}
