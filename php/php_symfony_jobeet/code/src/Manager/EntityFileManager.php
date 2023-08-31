<?php


namespace App\Manager;

use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class EntityFileManager
{
    private $fileSystem;

    private $fileStorage;

    private $uploadDir;

    public function __construct( Filesystem $_fileSystem, string $_uploadDir, string $_publicDir )
    {
        $this->fileSystem = $_fileSystem;
        $this->uploadDir = $_uploadDir;
        $this->fileStorage = $_publicDir.$_uploadDir;
    }

    public function createDirectoryIfNotExist( string $fullDirPath ) : void
    {
        try
        {
            if ( !$this->fileSystem->exists($fullDirPath) )
            {
                $old = umask(0);
                $this->fileSystem->mkdir($fullDirPath);
                $this->fileSystem->chown($fullDirPath, "www-data");
                $this->fileSystem->chgrp($fullDirPath, "www-data");
                umask($old);
            }
        } catch (IOExceptionInterface $exception)
        {
            echo $exception->getMessage();
        }
    }

    public function moveFile( string $origLoc, string $destLoc ) :void
    {
        try
        {
            $this->fileSystem->copy( $origLoc, $destLoc );
            $this->fileSystem->remove( $origLoc );
        } catch (IOExceptionInterface $exception) {
            echo $exception->getMessage();
        }
    }

    public function getFileInfo( string $fileName ) : array
    {
        $pathInfo = pathinfo( $fileName );
        $pathInfo['original'] = $pathInfo['dirname'].'/'.$pathInfo['filename'];
        return $pathInfo;
    }

    public function storeFile( string $fileTempLoc, string $fileDest, string $fileStoreName  ) : string
    {
        $destDir = $this->fileStorage.$fileDest; // path absoluto de destino
        $finalFile = "$destDir/$fileStoreName"; // path final hacia donde moveremos el archivo
        $this->createDirectoryIfNotExist( $destDir ); //creamos el directorio si no existe
        $this->moveFile( $fileTempLoc,$finalFile );
        return $this->uploadDir.$fileDest.'/'.$fileStoreName;
    }

}