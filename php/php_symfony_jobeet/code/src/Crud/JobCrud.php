<?php


namespace App\Crud;


use App\Entity\Job;
use App\FormType\JobFormType;
use Symfony\Component\Security\Core\User\UserInterface;

class JobCrud extends BaseCrud
{

    public function getEntityForm() : string
    {
        return JobFormType::class;
    }

    public function getEntityClassName() : string
    {
        return Job::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["indexJobsByCompany","findJobByCompany"],
            "ROLE_ADMIN" => ["findJobByAdmin","indexJobsByAdmin"],
            "ROLE_ANONYMOUS"=>["processUserJobSearch","getJobsByCategory","findJobByAnonymous","indexJobsByAnonymous"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findJobByCompany",
            "ROLE_ADMIN" => "findJobByAdmin",
            "ROLE_ANONYMOUS" => "findJobByAnonymous",
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_ADMIN" => "indexJobsByAdmin",
            "ROLE_COMPANY" => "indexJobsByCompany",
            "ROLE_ANONYMOUS" => "indexJobsByAnonymous"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"],
            "delete" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "create" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"],
            "edit" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "index" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"]
        ];
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Jobs";
    }

    public function getIndexTableInfo() : array
    {
        return [
            [
                "accessor" => [
                    "method"=>"getJbTitle",
                    "params" => []
                ],
                "display" => "Title"
            ],[
                "accessor" => [
                    "method"=>"getJbCategoryName",
                    "params" => []
                ],
                "display" => "Category"
            ],[
                "accessor" => [
                    "method"=>"getJbJobTypename",
                    "params" => []
                ],
                "display" => "Type"
            ],[
                "accessor" => [
                    "method"=>"getJbCompanyName",
                    "params" => []
                ],
                "display" => "Company"
            ],[
                "accessor" => [
                    "method" => "getJbPositionInfo",
                    "params" => ["getPoName"]
                ],
                "display" => "Position"
            ],[
                "accessor" => [
                    "method" => "actions",
                    "params" => []
                ],
                "display" => ""
            ],
        ];
    }
}