<?php


use App\Models\Auth\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
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

        // Começar a partir de 11 porque a AgencyFactory cria os diretores
        for ($id = 11; $id <= 60; $id++) {
            factory(User::class)->create(['agency_id' => rand(1, 10)]);
            $user = User::find($id)->assignRole(config('access.users.default_role'));
        }

        $this->enableForeignKeys();
    }
}
