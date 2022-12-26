<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends BaseModel
{
    protected $primaryKey = "inv_id";

    protected $dates = ['created_at', 'updated_at','deleted_at','inv_date'];

    public function currency(){
        return $this->belongsTo('App\Models\Currency','inv_currency')->withDefault();
    }

    public function status(){
        return $this->belongsTo('App\Models\Option','inv_status')->withDefault();
    }

    public function paymentMethod(){
        return $this->belongsTo('App\Models\Option','inv_payment_method')->withDefault();
    }

    public function inv_reference(){
        return $this->morphTo();
    }

    public function attachment(){
        return $this->morphOne('App\Models\Attachment','att_reference')->withDefault();
    }

    public function getInvoiceNumberAttribute(){
        return $this->inv_number;
    }

    public function getInvoiceDateAttribute(){
        return $this->inv_date->format(config('constants.DEFAULT_DATE_FORMAT'));
    }

    public function getAttachmentFileAttribute(){
        return $this->attachment->att_filename;
    }


}