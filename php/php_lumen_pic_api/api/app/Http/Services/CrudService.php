<?php

namespace App\Http\Services;
use App\Http\Interfaces\HasValidation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Http\Exceptions\ArrayException;

class CrudService
{

    private $table;

    public function setTable( string $table )
    {
        $this->table = $table;
        return $this;
    }

    public function validate(   array $validation,
                                array $data )
    {
        $validator = Validator::make($data,$validation);
        if ($validator->fails()) 
        {
            throw new ArrayException(["msg"=>$validator->messages()],422);
        }
    }

    public function buildPartialValidation( HasValidation $obj, 
                                            array $data ) 
    {
        $toValidate = [];
        foreach( $obj->getValidation() as $field=>$rule ) 
        {
            if (isset($data[$field]))
            {
                $toValidate[$field] = $rule;
            }
        }
        return $toValidate;
    }

    public function isExistingObj( $obj )
    {
        if(is_null($obj))
        {
        }
    }

    public function create( HasValidation $obj, 
                            array $data ) : HasValidation
    {
        $this->validate($obj->getValidation(),$data);
        $obj->fill($data);
        $obj->save();
        return $obj;
    }

    public function update( array $query,
                            string $model, 
                            array $data ) : HasValidation
    {
        $obj = DB::table($this->table)->where($query)->first();
        if(is_null($obj))
        {
            throw new ArrayException(["msg"=>"No object found"],404);
        }
        $toUpdate = new $model( (array)$obj );
        $this->validate($this->buildPartialValidation($toUpdate,$data),$data);
        $toUpdate->fill($data);
        $toUpdate->save();
        return $toUpdate;
    }

    public function delete( array $query ) : void
    {
        $deleted = DB::table($this->table)->where($query)->delete();
        if($deleted === 0)
        {
            throw new ArrayException(["msg"=>"Could not delete, object not found"],404);
        }
    }

    public function find(   array $query,
                            string $model  ) : Model
    {
        $obj = DB::table($this->table)->where($query)->first();
        if(is_null($obj))
        {
            throw new ArrayException(["msg"=>"No object found"],404);
        }
        $found = new $model( (array)$obj );
        return $found;
    }

}