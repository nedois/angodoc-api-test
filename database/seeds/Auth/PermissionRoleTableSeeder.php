<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Class PermissionRoleTableSeeder.
 */
class PermissionRoleTableSeeder extends Seeder
{
    use DisableForeignKeys;

    /**
     * Run the database seed.
     */
    public function run()
    {
        $this->disableForeignKeys();

        // Create Roles
        Role::create(['name' => config('access.users.admin_role')]);
        $director = Role::create(['name' => config('access.users.director_role')]);
        $operador = Role::create(['name' => config('access.users.default_role')]);

        // Create Permissions
        Permission::create(['name' => 'view backend']);

        $director->givePermissionTo('view backend');
        $operador->givePermissionTo('view backend');

        // Assign Permissions to other Roles
        // Note: Admin (User 1) Has all permissions via a gate in the AuthServiceProvider
        // $user->givePermissionTo('view backend');

        $this->enableForeignKeys();
    }
}
