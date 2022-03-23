<?php

namespace App\Http\Exceptions;

class ArrayException extends \Exception
{

    private $rawMessage;

    public function __construct(array $message, $code = 0, \Exception $previous = null) 
    {
        parent::__construct(json_encode($message), $code, $previous);
        $this->rawMessage = $message;
    }

    public final function getRawMessage()
    {
        return $this->rawMessage;
    }
}