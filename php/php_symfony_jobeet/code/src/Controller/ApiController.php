<?php

namespace App\Controller;

use App\Contract\EntityInterface;
use App\Entity\Category;
use App\FormType\CategoryFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\ExtraAttributesException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiController extends AbstractController
{
    private $repository;

    private $entityManager;

    private $validator;

    private $serializer;
    /**
     *  GET  /api/categorias --> Retorna el listado de todas las categorias
     *  POST /api/categorias --> Permite crear una categoria.
     *  PUT  /api/categorias/{idCategoria} --> Permite modificar el nombre de una categoria
     *  DELETE /api/categorias/{idCategoria} --> Permite eliminar una categoria siempre y cuando esta no tenga trabajos u otros datos ya asociados.
     */
    public function __construct(
        EntityManagerInterface $_entityManager,
        SerializerInterface $_serializer,
        ValidatorInterface $_validator
    )
    {
        $this->entityManager = $_entityManager;
        $this->repository = $this->entityManager->getRepository(Category::class);
        $this->serializer = $_serializer;
        $this->validator = $_validator;
    }

    private function getCategoryAttributes() : array
    {
        return [
            AbstractNormalizer::ATTRIBUTES => [
                'caId',
                'caName',
                'caAdmin' => ['amName'],
                'acAffiliate' => ['afName','afEmail']
            ]
        ];
    }

    public function getValidationErrors( ConstraintViolationList $errors ) : array
    {
        $errorBag =[];
        foreach ($errors as $obj=>$err)
        {
            $errorBag[$err->getPropertyPath()]=$err->getMessage();
        }
        return $errorBag;
    }


    /**
     * @Route(
     *     "api/v1/category",
     *     name="api-category-index",
     *     methods={"GET"}
     * )
     */
    public function categoryIndex(Request $request): Response
    {
        $categories = $this->repository->findAll();
        $data = $this->serializer->normalize($categories, 'json', $this->getCategoryAttributes());
        return new JsonResponse($data);
    }
    /**
     * @Route(
     *     "api/v1/category/{caId}",
     *     name="api-category-view",
     *     requirements={"id"="\d+"},
     *     methods={"GET"}
     * )
     */
    public function categoryView(Request $request): Response
    {
        $category = $this->repository->findOneBy(["caId" => $request->get("caId")]);
        $data = $this->serializer->normalize($category, 'json', $this->getCategoryAttributes());
        return new JsonResponse($data);
    }

    /**
     * @Route(
     *     "api/v1/category/create",
     *     name="api-category-create",
     *     methods={"POST"}
     * )
     */
    public function categoryCreate(Request $request): Response
    {
        $jsonData = $request->getContent();
        $jsonResponse = new JsonResponse();
        try{
            $category = $this->serializer->deserialize($jsonData, Category::class, 'json',[
                AbstractNormalizer::ALLOW_EXTRA_ATTRIBUTES => false
            ]);
            $catValidationErrors = $this->validator->validate($category);
            $affValidationErrors = $this->validator->validate($category->getAcAffiliate());
            if(count($catValidationErrors)>0 | count($affValidationErrors)>0)
            {
                $jsonResponse->setStatusCode(422);
                $jsonResponse->setData(['errors'=>[
                    'category' => $this->getValidationErrors($catValidationErrors),
                    'affiliate' =>  $this->getValidationErrors($affValidationErrors),
                ]]);
            } else {
                $this->entityManager->persist($category);
                $this->entityManager->flush();
                $jsonResponse->setStatusCode(200);
                $jsonResponse->setData(['message'=>'Category created successfully']);
            }
        } catch( ExtraAttributesException $e ){
            $jsonResponse->setStatusCode(422);
            $jsonResponse->setData(['message'=>'invalid json data']);
        }
        return $jsonResponse;
    }
    /**
     * @Route(
     *     "api/v1/category/{caId}",
     *     name="api-category-delete",
     *     requirements={"id"="\d+"},
     *     methods={"DELETE"}
     * )
     */
    public function categoryDelete(Request $request): Response
    {
        $caId = $request->get('caId');
        $category = $this->entityManager->getRepository(Category::class)->findOneBy(['caId'=>$caId]);
        $jsonResponse = new JsonResponse();
        if($category)
        {
            $this->entityManager->remove($category);
            $this->entityManager->flush();
            $res = ["code" => 200,"message"=>"deleted category successfully" ];
        } else
        {
            $res = ["code" => 422,"message"=>"error on delete" ];
        }
        $jsonResponse->setStatusCode($res['code']);
        $jsonResponse->setData(['message' => $res['message']]);
        return $jsonResponse;
    }

    private function updateFields( array $data,EntityInterface $entity ) :EntityInterface
    {
        $extraAttributes = [];
        foreach($data as $fieldName=>$val)
        {
            $methodName = "set$fieldName";
            if (method_exists($entity,$methodName))
            {
                $entity->{$methodName}($val);
            } else
            {
                $extraAttributes[]=$fieldName;
            }
        }
        if(empty($extraAttributes))
            return $entity;
        throw new ExtraAttributesException($extraAttributes);
    }

    /**
     * @Route(
     *     "api/v1/category/{caId}",
     *     name="api-category-update",
     *     requirements={"id"="\d+"},
     *     methods={"PUT"}
     * )
     */
    public function categoryUpdate( Request $request ): Response
    {
        $caId = $request->get('caId');
        $jsonResponse = new JsonResponse();
        $jsonData = json_decode($request->getContent(),true);
        $category = $this->entityManager->getRepository(Category::class)->findOneBy(['caId'=>$caId]);
        try {
            $category = $this->updateFields($jsonData,$category);
            $validationErrors = $this->validator->validate($category);
            if(count($validationErrors)>0)
            {
                $jsonResponse->setStatusCode(422);
                $jsonResponse->setData(['errors'=>['category' => $this->getValidationErrors($validationErrors)]]);
            } else {
                $this->entityManager->persist($category);
                $this->entityManager->flush();
                $jsonResponse->setStatusCode(200);
                $jsonResponse->setData(['message' => 'Category updated successfully']);
            }
        } catch(ExtraAttributesException $e) {
            $jsonResponse->setStatusCode(422);
            $jsonResponse->setData(['message' => 'extra attributes present on update','extra'=>$e->getExtraAttributes()]);
        }
        return $jsonResponse;
    }
}
