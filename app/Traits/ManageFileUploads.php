<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Attachment;
use Illuminate\Support\Facades\Auth;

trait ManageFileUpload
{
    public function saveAttachmentFile(Request $request, $folderPath=null, $asPublic=true){

        $attachment = null;

        if($folderPath == null){
            $folderPath=config('constants.DEFAULT_STORAGE_PATH');
        }
        $attachmentFiles = $request->file();

        if($attachmentFiles){

            $attachedFile = $attachmentFiles['attachment'];
            if($asPublic){
                $storagePath = Storage::put($folderPath, $attachedFile,'public');
            }else{
                $storagePath = Storage::put($folderPath, $attachedFile);
            }

            $attachment = new Attachment();
            $attachment->created_by = Auth::user()->id;
            $attachment->att_storage_path = $storagePath;
            $attachment->att_filename = $attachedFile->getClientOriginalName();
            $attachment->att_filesize = $attachedFile->getSize();
        }

        return $attachment;

    }
}