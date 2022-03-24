<?php


namespace App\Crud;

use App\Entity\Company;
use App\FormType\CompanyFormType;
use App\Contract\EntityInterface;

class CompanyCrud extends BaseCrud
{
    public function getEntityForm() : string
    {
        return CompanyFormType::class;
    }

    public function getEntityClassName() : string
    {
        return Company::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["findCompanyByCompany"],
            "ROLE_ADMIN" => ["findCompanyByAdmin","indexCompaniesByAdmin"],
            "ROLE_ANONYMOUS" => ["indexCompaniesByAnonymous"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findCompanyByCompany",
            "ROLE_ADMIN" => "findCompanyByAdmin",
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole =[
            "ROLE_ADMIN" => "indexCompaniesByAdmin",
            "ROLE_ANONYMOUS" => "indexCompaniesByAnonymous"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "delete" => ["ROLE_ADMIN"],
            "create" => ["ROLE_ADMIN"],
            "edit" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "index" => ["ROLE_ADMIN","ROLE_ANONYMOUS"]
        ];
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Companies";
    }

    public function getIndexTableInfo(): array
    {
        return [
            [
                "accessor" => [
                    "method" => "getCoAdminName",
                    "params" => []
                ],
                "display" => "Company Admin"
            ], [
                "accessor" => [
                    "method" => "getCoName",
                    "params" => []
                ],
                "display" => "Company Name"
            ],  [
                "accessor" => [
                    "method" => "getCoCreatedAt",
                    "params" => []
                ],
                "display" => "Company Created At"
            ],[
                "accessor" => [
                    "method" => "getCoUpdatedAt",
                    "params" => []
                ],
                "display" => "Company Updated At"
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