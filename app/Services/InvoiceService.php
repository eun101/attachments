<?php 

namespace App\Services;

use App\Models\Invoice;
use App\Traits\DropDownListOptions;

class InvoiceService extends AbstractModelService implements IModelService{

    use DropDownListOptions;

    public function getList($filters, $paginate=false){

        $resultList = Invoice::with('createdBy');

        if(array_key_exists('keyword', $filters) && $filters['keyword'] != ''){
            $resultList->where(function($query) use($filters){
                $query->where('inv_number','like', '%'.$filters['keyword'].'%');
                $query->orWhere('inv_to','like', '%'.$filters['keyword'].'%');
                $query->orWhere('inv_to','like', '%'.$filters['keyword'].'%');
            });
        }

        /*if(array_key_exists('invoice_number', $filters) && $filters['invoice_number'] != ''){
            $resultList->where('inv_number','like', '%'.$filters['invoice_number'].'%');
        }

        if(array_key_exists('invoice_to', $filters) && $filters['invoice_to'] != ''){
            $resultList->where('inv_to','like', '%'.$filters['invoice_to'].'%');
        }*/

        if(array_key_exists('date_from', $filters) && $filters['date_from'] != ''){
            $resultList->where('inv_date','>=', $filters['date_from']);
        }

        if(array_key_exists('date_to', $filters) && $filters['date_to'] != ''){
            $resultList->where('inv_date','<=', $filters['date_to']);
        }
        
        if($paginate){
            return $resultList->paginate(config('constants.PAGINATION_COUNT'));
        }else{
            return $resultList->get();
        }

    }

    public function setValues($formdata, $record){

    }

    public function destroy($recordId){
        
    }
  

}