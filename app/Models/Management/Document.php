<?php

namespace App\Models\Management;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Management\Traits\Relationship\DocumentRelationship;

class Document extends Model
{
    use DocumentRelationship, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'reference',
        'user_id',
        'finder_id',
        'agency_id',
        'recovered',
        'owner',
        'type',
        'date_emission',
        'commentary'
    ];

    /**
     * The dynamic attributes from mutators that should be returned with the user object.
     * @var array
     */
    protected $appends = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date_emission' => 'datetime',
        'recovered_at' => 'datetime'
    ];

    /**
     * @var array
     */
    protected $dates = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];
}
