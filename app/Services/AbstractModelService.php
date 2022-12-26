<?php

namespace App\Services;

abstract class AbstractModelService{

    protected $filters = null;

    abstract public function getList($filters);

}
