<?php

use Carbon\Carbon;
use Faker\Generator;
use Ramsey\Uuid\Uuid;
use App\Models\Auth\User;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$provinces = [
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

$factory->define(User::class, function (Generator $faker) use ($provinces) {
    $gender = $faker->randomElement(['M', 'F']);

    return [
        'uuid' => Uuid::uuid4()->toString(),
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName($gender),
        'gender' => $gender,
        'bi' => Uuid::uuid4()->toString(),
        'province' => $faker->randomElement($provinces),
        'phone_number' => $faker->phoneNumber,
        'address' => $faker->address,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => Carbon::now(),
        'password' => 'secret',
        'password_changed_at' => null,
        'remember_token' => Str::random(10),
        'confirmation_code' => md5(uniqid(mt_rand(), true)),
        'active' => true,
        'confirmed' => true,
    ];
});

$factory->state(User::class, 'active', function () {
    return [
        'active' => true,
    ];
});

$factory->state(User::class, 'inactive', function () {
    return [
        'active' => false,
    ];
});

$factory->state(User::class, 'confirmed', function () {
    return [
        'confirmed' => true,
    ];
});

$factory->state(User::class, 'unconfirmed', function () {
    return [
        'confirmed' => false,
    ];
});

$factory->state(User::class, 'softDeleted', function () {
    return [
        'deleted_at' => now(),
    ];
});
