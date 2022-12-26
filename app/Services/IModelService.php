<?php

namespace App\Services;

interface IModelService{

    public function setValues($formdata, $record);

    public function destroy($recordId);

}