<?php

use Carbon\Carbon;
use App\Models\Auth\User;
use Illuminate\Database\Seeder;

/**
 * Class AdminTableSeeder.
 */
class AdminTableSeeder extends Seeder
{
    use DisableForeignKeys;

    /**
     * Run the database seed.
     */
    public function run()
    {
        $this->disableForeignKeys();

        // Add the master administrator, user id of 1
        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'bi' => 'adminbi2020',
            'email' => 'admin@admin.com',
            'email_verified_at' => Carbon::now(),
            'password' => bcrypt('admin'),
            'phone_number' => '+244 000 000 000',
            'gender' => 'M',
            'address' => 'Endereço do escritorio da AngoDoc',
            'province' => 'Luanda',
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed' => true,
        ]);

        User::create([
            'first_name' => 'Agence',
            'last_name' => 'Director',
            'email' => 'director@director.com',
            'bi' => 'directorbi2020',
            'email_verified_at' => Carbon::now(),
            'password' => 'director',
            'phone_number' => '+244 000 000 000',
            'gender' => 'M',
            'address' => 'Endereço do escritorio da AngoDoc',
            'province' => 'Luanda',
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed' => true,
        ]);

        User::create([
            'first_name' => 'Agence',
            'last_name' => 'Operator',
            'bi' => 'operatorbi2020',
            'email' => 'operator@operator.com',
            'email_verified_at' => Carbon::now(),
            'phone_number' => '+244 000 000 000',
            'gender' => 'M',
            'address' => 'Endereço do escritorio da AngoDoc',
            'password' => 'operator',
            'province' => 'Luanda',
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed' => true,
        ]);

        $this->enableForeignKeys();
    }
}
