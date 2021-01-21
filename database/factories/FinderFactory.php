<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\Auth\User;
use App\Models\Management\Agency;
use App\Models\Management\Finder;
use Faker\Generator as Faker;

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

$factory->define(Finder::class, function (Faker $faker) use ($provinces) {
    $gender = $faker->randomElement(['M', 'F']);

    return [
        'user_id' => factory(User::class),
        'agency_id' => factory(Agency::class),
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'age' => $faker->numberBetween(16, 80),
        'job' => $faker->randomElement(['trabalhador', 'estudante', 'desempregado']),
        'address' => $faker->address,
        'bi' => $faker->unique()->uuid,
        'province' => $faker->randomElement($provinces),
        'gender' => $gender,
        'phone_number' => $faker->phoneNumber
    ];
});
