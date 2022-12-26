<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\DropDownListOptions;

class BaseModel extends Model
{
    use HasFactory, SoftDeletes, DropDownListOptions;

    protected $primaryKey = "";

    protected $dates = ['created_at', 'updated_at','deleted_at','inv_date'];

    public function createdBy(){
        return $this->belongsTo('App\Models\User','created_by');
    }

    public function modifiedBy(){
        return $this->belongsTo('App\Models\User','modified_by');
    }

    
}