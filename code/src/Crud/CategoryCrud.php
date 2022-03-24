<?php


namespace App\Crud;

use App\Entity\Category;
use App\FormType\CategoryFormType;
use App\Contract\EntityInterface;

class CategoryCrud extends BaseCrud
{

    public function getEntityForm() : string
    {
        return CategoryFormType::class;
    }

    public function getEntityClassName() : string
    {
        return Category::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["findCategoryByCompany","indexCategoriesByCompany"],
            "ROLE_ADMIN" => ["findCategoryByAdmin","indexCategoriesByAdmin"],
            "ROLE_ANONYMOUS" => ["indexAllCategories","indexCategoriesByAnonymous","findCategoryByAnonymous"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findCategoryByCompany",
            "ROLE_ADMIN" => "findCategoryByAdmin",
            "ROLE_ANONYMOUS" => "findCategoryByAnonymous"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "indexCategoriesByCompany",
            "ROLE_ADMIN" => "indexCategoriesByAdmin",
            "ROLE_ANONYMOUS" => "indexCategoriesByAnonymous"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "delete" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "create" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "edit" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "index" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"],
            "affiliate" => ["ROLE_ANONYMOUS"]
        ];
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Categories";
    }

    public function getIndexTableInfo() : array
    {
        return [
            [
                "accessor" => [
                    "method"=>"getCaAdminName",
                    "params" => []
                ],
                "display" => "Admin"
            ],[
                "accessor" => [
                    "method"=>"getCaCompanyName",
                    "params" => []
                ],
                "display" => "Company Name"
            ],[
                "accessor" => [
                    "method"=>"getCaName",
                    "params" => []
                ],
                "display" => "Category Name"
            ],[
                "accessor" => [
                    "method" => "actions",
                    "params" => []
                ],
                "display" => ""
            ]
        ];
    }

    public function getSingleViewExtraData( int $id ) : array
    {
        $affiliateCrud = new AffiliateCrud( $this->entityManager, $this->userRole,$this->actionManager  );
        return [
            "title" => "Affiliates",
            "data" => $affiliateCrud->getEntityIndex("index")->getResult(),
            "accessors" => $affiliateCrud->getIndexTableInfo(),
            "actions" => $this->actionManager->getActionsWith($affiliateCrud->getCrudActions(),$affiliateCrud->getEntityClassName(),["view"])
        ];
    }
}