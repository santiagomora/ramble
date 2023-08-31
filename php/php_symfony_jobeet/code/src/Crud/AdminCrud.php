<?php


namespace App\Crud;


use App\Entity\Affiliate;
use App\FormType\AffiliateFormType;
use App\Contract\EntityInterface;

class AdminCrud extends BaseCrud
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
            "ROLE_ADMIN" => ["findAdminByAdmin"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_ADMIN" => "findAdminByAdmin"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        return "";
    }

    public function getCrudActions() : array
    {
        return [
            "view" => ["ROLE_ADMIN"],
            "delete" => [],
            "create" => [],
            "edit" => ["ROLE_ADMIN"],
            "index" => []
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
        $categoryCrud = new CategoryCrud( $this->arrayHelper, $this->entityManager, $this->roleManager );
        return [
            "title" => "Categories",
            "data" => $this->getEntityInstance($id)->getAcCategory(),
            "accessors" => $categoryCrud->getIndexTableInfo(),
            "actions" => $categoryCrud->getActionsWithInclusion(["view"])
        ];
    }
}