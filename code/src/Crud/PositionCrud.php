<?php


namespace App\Crud;

use App\Entity\Position;
use App\FormType\PositionFormType;

use App\Contract\EntityInterface;

class PositionCrud extends BaseCrud
{
    public function getEntityForm() : string
    {
        return PositionFormType::class;
    }

    public function getAllowedQueriesByRole( string $roleName ): array
    {
        $allowedQueryByRole = [
            "ROLE_COMPANY" => ["indexPositionsByCompany","findPositionByCompany"],
            "ROLE_ADMIN" => ["indexPositionsByAdmin","findPositionByAdmin"],
            "ROLE_ANONYMOUS" => ["indexPositionsByAnonymous"]
        ];
        return $allowedQueryByRole[$roleName]??[];
    }

    public function getSingleQueryByRole( string $roleName ) : string
    {
        $queryByRole = [
            "ROLE_COMPANY" => "findPositionByCompany",
            "ROLE_ADMIN" => "findPositionByAdmin"
        ];
        return $queryByRole[$roleName]??"";
    }

    public function getIndexQueryByRole( string $roleName ) : string
    {
        $queryByRole =[
            "ROLE_ADMIN" => "indexPositionsByAdmin",
            "ROLE_COMPANY" => "indexPositionsByCompany"
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
            "index" => ["ROLE_ADMIN","ROLE_COMPANY","ROLE_ANONYMOUS"]
        ];
    }

    public function getEntityClassName() : string
    {
        return Position::class;
    }

    public function getIndexViewTitle() : string
    {
        return "Existing Positions";
    }

    public function getIndexTableInfo() : array
    {
        return [
            [
                "accessor" => [
                    "method"=>"getPoAdminName",
                    "params" => []
                ],
                "display" => "Admin"
            ],[
                "accessor" => [
                    "method"=>"getPoName",
                    "params" => []
                ],
                "display" => "Position Name"
            ],[
                "accessor" => [
                    "method"=>"getPoCompanyName",
                    "params" => []
                ],
                "display" => "Company Name"
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