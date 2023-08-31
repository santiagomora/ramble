<?php


namespace App\Crud;

use App\Entity\JobType;
use App\FormType\JobTypeFormType;
use App\Contract\EntityInterface;

class JobTypeCrud extends BaseCrud
{
    public function getEntityForm() : string
    {
        return JobTypeFormType::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["indexJobTypesByCompany","findJobTypeByCompany"],
            "ROLE_ADMIN" => ["indexJobTypesByAdmin","findJobTypeByAdmin"],
            "ROLE_ANONYMOUS" => ["indexJobTypesByAnonymous"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findJobTypeByCompany",
            "ROLE_ADMIN" => "findJobTypeByAdmin"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole =[
            "ROLE_ADMIN" => "indexJobTypesByAdmin",
            "ROLE_COMPANY" => "indexJobTypesByCompany"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "delete" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "create" => ["ROLE_ADMIN","ROLE_COMPANY" ],
            "edit" => ["ROLE_ADMIN","ROLE_COMPANY" ],
            "index" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"]
        ];
    }

    public function getEntityClassName() : string
    {
        return JobType::class;
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Job Types";
    }

    public function getIndexTableInfo() : array
    {
        return [
            [
                "accessor" => [
                    "method"=>"getJtAdminName",
                    "params" => []
                ],
                "display" => "Admin"
            ],[
                "accessor" => [
                    "method"=>"getJtName",
                    "params" => []
                ],
                "display" => "Job Type Name"
            ],[
                "accessor" => [
                    "method"=>"getJtCompanyName",
                    "params" => []
                ],
                "display" => "Job Type Company Name"
            ],[
                "accessor" => [
                    "method" => "actions",
                    "params" => []
                ],
                "display" => ""
            ]
        ];
    }
}