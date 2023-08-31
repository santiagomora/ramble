<?php


namespace App\Contract;


use Symfony\Component\HttpFoundation\File\UploadedFile;

interface HasFilesInterface
{
    public function getFileStorageDir( string $dirId ) : string;

    public function storeFile( UploadedFile $file, string $fieldName, string $storeName ) : void;
}