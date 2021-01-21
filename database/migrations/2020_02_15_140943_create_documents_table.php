<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('documents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('reference')->unique();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('finder_id')->unsigned();
            $table->bigInteger('agency_id')->unsigned();
            $table->string('owner');
            $table->string('type');
            $table->timestamp('recovered_at')->nullable();
            $table->timestamp('date_emission')->nullable();
            $table->text('commentary')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
