<?php


namespace App\Crud;


use App\Entity\Affiliate;
use App\FormType\AffiliateFormType;

class AffiliateCrud extends BaseCrud
{
    public function getEntityForm() : string
    {
        return AffiliateFormType::class;
    }

    public function getEntityClassName() : string
    {
        return Affiliate::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["indexAffiliatesByCompany","findAffiliateByCompany"],
            "ROLE_ADMIN" => ["indexAffiliatesByAdmin","findAffiliateByAdmin"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findAffiliateByCompany",
            "ROLE_ADMIN" => "findAffiliateByAdmin"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_ADMIN" => "indexAffiliatesByAdmin",
            "ROLE_COMPANY" => "indexAffiliatesByCompany"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "delete" => ["ROLE_ADMIN"],
            "create" => ["ROLE_ANONYMOUS"],
            "edit" => ["ROLE_ADMIN","ROLE_COMPANY"],
            "index" => ["ROLE_ADMIN","ROLE_COMPANY"]
        ];
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Affiliates";
    }

    public function getIndexTableInfo() : array
    {
        return [
            [
                "accessor" => [
                    "method"=>"getAfAdminName",
                    "params" => []
                ],
                "display" => "Admin"
            ],[
                "accessor" => [
                    "method"=>"getAfName",
                    "params" => []
                ],
                "display" => "Affiliate Name"
            ],[
                "accessor" => [
                    "method"=>"getAfEmail",
                    "params" => []
                ],
                "display" => "Affiliate Email"
            ],[
                "accessor" => [
                    "method"=>"getAfUrl",
                    "params" => []
                ],
                "display" => "Affiliate URL"
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
        $categoryCrud = new CategoryCrud( $this->entityManager, $this->userRole,$this->actionManager );
        return [
            "title" => "Categories",
            "data" => $categoryCrud->getEntityIndex( "index" )->getResult(),
            "accessors" => $categoryCrud->getIndexTableInfo(),
            "actions" => $this->actionManager->getActionsWith($categoryCrud->getCrudActions(),$categoryCrud->getEntityClassName(),["view"])
        ];
    }
}