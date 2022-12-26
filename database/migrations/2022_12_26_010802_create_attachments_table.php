<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->increments('att_id');
            $table->integer('att_reference_id');            
            $table->string('att_reference_type', 100);            
            $table->string('att_filename', 200);
            $table->string('att_storage_path', 500);
            $table->integer('att_filesize')->nullable();
            $table->string('att_description', 300)->nullable();            
            $table->integer('created_by');
            $table->dateTime('created_at');
            $table->integer('modified_by')->nullable()->default(0);
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attachments');
    }
};