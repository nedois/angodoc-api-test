<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgenciesTable extends Migration
{
    protected $provinces = [
        'Bengo',
        'Benguela',
        'Bié',
        'Cabinda',
        'Cuando-Cubango',
        'Cuanza Norte',
        'Cuanza Sul',
        'Cunene',
        'Huambo',
        'Huíla',
        'Luanda',
        'Lunda Norte',
        'Lunda Sul',
        'Malanje',
        'Moxico',
        'Namibe',
        'Uíge',
        'Zaire'
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('agencies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('user_id')->unsigned();
            $table->string('address');
            $table->enum('province', $this->provinces);
            $table->json('schedule')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('agencies', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('agency_id')->references('id')->on('agencies');
        });
        Schema::table('documents', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('finder_id')->references('id')->on('finders');
            $table->foreign('agency_id')->references('id')->on('agencies');
        });
        Schema::table('finders', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('agency_id')->references('id')->on('agencies');
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
        Schema::dropIfExists('agencies');
    }
}
