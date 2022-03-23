<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Cuadro;
use App\Http\Resources\CuadroResource;
use App\Http\Services\CrudService;
use App\Http\Builder\Filter\FilterBuilder;
use App\Http\Builder\Filter\RecordFilter;
use App\Http\Builder\Filter\ColumnFilter;
use App\Http\Exceptions\ArrayException;

class CuadroController extends Controller
{
    private $crudService; 

    private $user;

    public function __construct(    CrudService $crudService )
    {
        $this->user = auth()->user();
        $this->crudService = $crudService;
    }

    public function add(Request $request) : Response  
    {
        $data = array_merge(
            $request->post(),
            ["id_dueno"=>$this->user->id]
        );
        try {
            $nuevoCuadro = $this->crudService->create(new Cuadro(),$data);
            return response(['cuadro'=>new CuadroResource($nuevoCuadro),"msg"=>'Cuadro creado exitosamente'],200);
        }
        catch(ArrayException $e)
        {
            return response($e->getRawMessage(),$e->getCode());
        }
        
    }

    public function update(Request $request) : Response  
    {
        $updateData = $request->post();
        unset($updateData['id']);
        $query = ['id'=>$request->route('id'),'id_dueno'=>$this->user->id];
        try {
            $cuadro = $this->crudService->setTable('cuadro')->update($query,Cuadro::class,$updateData);
            return response([
                    'cuadro'=> $cuadro,
                    "msg"=>'Cuadro actualizado exitosamente'
                ],
                200
            );
        }
        catch(ArrayException $e)
        {
            return response($e->getRawMessage(),$e->getCode());
        }
    }

    public function delete(Request $request) : Response  
    {
        try {
            $query = ['id'=>$request->route('id'),'id_dueno'=>$this->user->id];
            $this->crudService->setTable('cuadro')->delete($query);
            return response(['success'=>'Cuadro eliminado'],200);
        }
        catch(ArrayException $e)
        {
            return response($e->getRawMessage(),$e->getCode());
        }
    }

    public function view(Request $request) : Response  
    {
        try {
            $query = ['id'=>$request->route('id'),'id_dueno'=>$this->user->id];
            $cuadro = $this->crudService->setTable('cuadro')->find($query,Cuadro::class);
            return response(new CuadroResource($cuadro),200);
        }
        catch(ArrayException $e){
            return response($e->getRawMessage(),$e->getCode());
        }
    }

    public function list(Request $request) : Response  
    {
        $query = $request->query();
        $cuadro = new Cuadro;
        $res = [];
        try  {
            (new FilterBuilder(Cuadro::class))
                ->build( 
                    [new RecordFilter($query,$cuadro),new ColumnFilter($query,$cuadro)],
                    ['id_dueno'=>$this->user->id]
                )
                ->storeCasted($res)
                ->clean();
            return response(['cuadros'=>CuadroResource::collection($res)],200);
        }
        catch( ArrayException $e )
        {
            return response($e->getRawMessage(),$e->getCode());
        }
    }
    
}
