<?php

use App\Models\Management\Document;
use Illuminate\Database\Seeder;

class DocumentTableSeeder extends Seeder
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

        for ($i = 1; $i <= 100; $i++) {
            factory(Document::class)->create([
                'user_id' => rand(1, 60),
                'finder_id' => rand(1, 20),
                'agency_id' => rand(1, 10)
            ]);
        }

        $this->enableForeignKeys();
    }
}
