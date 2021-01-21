<?php

use Illuminate\Database\Seeder;

class ManagementTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;

    /**
     * Run the database seeds.
     */
    public function run()
    {
        $this->disableForeignKeys();

        $this->truncateMultiple([
            'agencies',
            'finders',
            'documents',
        ]);

        $this->call(AgencyTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(FinderTableSeeder::class);
        $this->call(DocumentTableSeeder::class);

        $this->enableForeignKeys();
    }
}
