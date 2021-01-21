<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Auth\User;
use Faker\Generator as Faker;
use App\Models\Management\Agency;

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

$factory->define(Agency::class, function (Faker $faker) use ($provinces) {
    return [
        'user_id' => factory(User::class),
        'name' => $faker->company . ' ' . $faker->companySuffix,
        'address' => $faker->address,
        'province' => $faker->randomElement($provinces),
        'schedule' => json_encode([
            'segunda' => ['09:00-18:00'],
            'terca' => ['08:00-12:00', '14:00-18:00'],
            'quarta' => ['08:00-12:00', '14:00-18:00'],
            'quinta' => ['Fechado'],
            'sexta' => ['08:00-12:00', '14:00-18:00'],
            'sabado' => ['Fechado'],
            'domingo' => ['Fechado'],
        ])
    ];
});
