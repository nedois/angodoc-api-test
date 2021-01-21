<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateUsersTable.
 */
class CreateUsersTable extends Migration
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
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('uuid');
            $table->bigInteger('agency_id')->unsigned()->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('bi')->unique();
            $table->string('phone_number')->nullable();
            $table->string('avatar_type')->default('gravatar');
            $table->string('avatar_location')->nullable();
            $table->string('password')->nullable();
            $table->enum('gender', ['M', 'F'])->default('M');
            $table->string('address')->nullable();
            $table->timestamp('password_changed_at')->nullable();
            $table->unsignedTinyInteger('active')->default(1);
            $table->string('confirmation_code')->nullable();
            $table->boolean('confirmed')->default(config('access.users.confirm_email') ? false : true);
            $table->enum('province', $this->provinces);
            $table->string('timezone')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->boolean('to_be_logged_out')->default(false);
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
