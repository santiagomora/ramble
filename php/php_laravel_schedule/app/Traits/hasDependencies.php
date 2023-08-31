<?php

namespace App\Traits;
use Illuminate\Support\Collection;
/**
 * handle dependency formatting
 * must define @param dependency inside class indicating which models this instance depends on
 */
trait hasDependencies
{
    public static $relationMapping = [
        'reservas'      => 'App\\Models\\Reserva',
        'horarios'      => 'App\\Models\\Horario',
        'feriados'      => 'App\\Models\\Feriado',
        'ubicaciones'   => 'App\\Models\\Ubicacion',
        'ubicacion'     => 'App\\Models\\Ubicacion',
        'eventos'       => 'App\\Models\\Evento',
        'evento'        => 'App\\Models\\Evento',
        'promociones'   => 'App\\Models\\Promocion',
        'promocion'     => 'App\\Models\\Promocion',
        'usuario'       => 'App\\User',
        'locales'       => 'App\\Local',
        'franquicia'    => 'App\\Franquicia',
        'franquicias'   => 'App\\Franquicia',
        'administrador' => 'App\\Admin'
    ];

    public static function getFormatOptions (string $opt, string $model){
        return $model::$formatOptions[$opt];
    }

    public static function getRelationMapping (string $name){
        return (isset(self::$relationMapping[$name])) ? self::$relationMapping[$name] : null;
    }

    public function getDependencies ($route) {
        return self::$dependencies[$route];
    }

    public function formatResults(
        $modelInstance,
        array $relations
    ) {
        $result = [];
        $nestedData = [];
        foreach ($relations as $name=>$method){
            $model = self::getRelationMapping($name);
            if ($method){
                $format = self::getFormatOptions($method,$model);
                $result[$name] =  $model::getFormattedData($modelInstance->{$name},$format);
            } elseif ($model){
                $result[$name] =  $model::getFormattedData($modelInstance->{$name},[]);
            }
        }
        return $result;
    }

    public static function getRightName (string $name) {
        return substr($name,strrpos($name,'.')+1);
    }

    public function getDependencyScopes(
        array $dependencies,
        array $options
    ) {
        $result = [];
        foreach ($dependencies as $dep) {
            if (isset($options[$dep])){
                $rightName = (strpos($dep,'.') && $options[$dep]) ? self::getRightName($dep) : $dep;
                $relationMap = self::getRelationMapping($rightName);
                $result[$dep] = call_user_func(
                    $relationMap.'::'.$rightName.'QueryCallback',
                    $options[$dep]
                );
            }
            else
                array_push($result,$dep);
        }
        return $result;
    }

    public function getData( $config ) {
        $relations = $this->getDependencyScopes( array_keys( $config->depends ),$config->scope );
        $user = $config->model::with( $relations )->find($config->uid);
        $data = self::formatResults( $user,$config->depends );
        return $user->pairExtra( $data,$config->extra );
    }
}
