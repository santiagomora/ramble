<?php

namespace App\Traits;
use Illuminate\Support\Collection;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
/**
 * managing data and dependency data format
 */
trait ValidatesForm
{
    protected $verbos = [
        'POST' => [
            'inf'=>'crear',
            'ger'=>'creado'
        ],
        'PUT'=>[
            'inf'=>'modificar',
            'ger'=>'modificado'
        ]
    ];

    protected $noUser = [
        'rules' => [
            'id_usuario' => 'bail|required|exists:usuarios,id'
        ],
        'messages' => [
            'id_usuario.required'   => 'No se ha indicado el usuario',
            'id_usuario.exists'     => 'El usuario debe existir'
        ],
    ];

    public function validateForm($request,$model) {
        $data = $request->post();

        $validation = isset($data['id_usuario'])
            ? $model::validateData($request)
            : $this->noUser;

        return Validator::make(
            $data,
            $validation['rules'],
            $validation['messages']
        );
    }

    public function storeRelationData (array $data, $model){
        $relations = $model->getRelationNames();
        if (count($relations)>0) {
            foreach ($relations as $name) {
                if(isset($data[$name]))
                    $model->{$name}()->sync($data[$name]);
            };
        }
    }

    public function storeData($request){
        $message = null;
        $instance = null;
        $method = $request->getMethod();
        $data = $request->post();
        $model = $this->model;
        $validation = $this->validateForm($request,$this->model);
        $title = $this->verbos[$method];

        if ($validation->fails()){
            $verb = $title['inf'];
            $message = [
                'type'=>'failure',
                'title'=>'Datos inválidos',
                'errors'=> $validation->errors(),
                'status'=> 422,
                'mensaje' => "Datos inválidos al $verb $model"
            ];
        } else {
            try {
                if ($method === 'POST'){
                    $instance = $this->model::create($data);
                } else {
                    $instance = $this->model::findOrFail($data['id']);
                    $instance->update($data);
                }
            } catch (\Exception $e) {
                $verb = $title['inf'];
                $message = [
                    'type'=>'failure',
                    'title'=> "Datos inválidos al $verb $model",
                    'status' => 400,
                    'errors'=> [],
                    'message' => $e->getMessage()
                ];
            } finally {
                if (is_null($message)){
                    $this->storeRelationData($data,$instance);
                    $verb = $title['ger'];
                    $redirect = (object) $this->getRedirect($instance->id);
                    $message = [
                        'type'=>'success',
                        'title'=>'Éxito',
                        'status' => 200,
                        'redirect'=>$redirect->dir,
                        'route' => $redirect->route,
                        'parameters'=>['id'=>$instance->id],
                        'errors'=> [],
                        'message' => "$model $verb exitosamente"
                    ];
                }
            }
        }
        return $message;
    }

    public function applyValidation (Request $request){
        $store = $this->storeData($request);
        return response($store,$store['status']);
    }
}
