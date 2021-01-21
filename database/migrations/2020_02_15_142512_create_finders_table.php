<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFindersTable extends Migration
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
        Schema::create('finders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('agency_id')->unsigned();
            $table->string('first_name');
            $table->string('last_name');
            $table->tinyInteger('age');
            $table->enum('job', ['trabalhador', 'estudante', 'desempregado'])->default('desempregado');
            $table->string('address')->nullable();
            $table->string('bi')->unique();
            $table->enum('gender', ['M', 'F'])->default('M');
            $table->enum('province', $this->provinces);
            $table->string('phone_number');
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
        Schema::dropIfExists('finders');
    }
}
