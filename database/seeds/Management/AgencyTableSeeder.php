<?php

use App\Models\Auth\User;
use Illuminate\Database\Seeder;
use App\Models\Management\Agency;

class AgencyTableSeeder extends Seeder
{
    use DisableForeignKeys;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->disableForeignKeys();

        factory(Agency::class, 10)->create();

        Agency::all()->each(function ($agency) {
            $agency->director->setAgency($agency)->assignRole(config('access.users.director_role'));
        });

        $agency = Agency::find(1);
        $director = User::find(2);
        $operator = User::find(3);

        $agency->setDirector($director);
        $operator->setAgency($agency);

        $this->enableForeignKeys();
    }
}
