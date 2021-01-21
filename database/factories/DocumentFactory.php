<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\Auth\User;
use App\Models\Management\Agency;
use App\Models\Management\Finder;
use App\Models\Management\Document;
use Faker\Generator as Faker;

$factory->define(Document::class, function (Faker $faker) {
    return [
        'user_id' => factory(User::class),
        'finder_id' => factory(Finder::class),
        'agency_id' => factory(Agency::class),
        'reference' => $faker->unique()->uuid,
        'owner' => $faker->name,
        'type' => $faker->randomElement(['passaporte', 'bi', 'cartão de estudante', 'cartão de eleitor']),
        'date_emission' => $faker->dateTime,
        'commentary' => $faker->sentence
    ];
});
