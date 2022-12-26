<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends BaseModel
{
    protected $primaryKey = "att_id";

    protected $dates = ['created_at', 'updated_at','deleted_at'];
}