<?php

use App\Models\Management\Finder;
use Illuminate\Database\Seeder;

class FinderTableSeeder extends Seeder
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

        for ($i = 1; $i <= 20; $i++) {
            factory(Finder::class)->create(['user_id' => rand(1, 60), 'agency_id' => rand(1, 10)]);
        }

        $this->enableForeignKeys();
    }
}
