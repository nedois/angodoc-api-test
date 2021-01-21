<?php

namespace App\Models\Management;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Management\Traits\Relationship\FinderRelationship;

class Finder extends Model
{

    use FinderRelationship, SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'agency_id',
        'first_name',
        'last_name',
        'age',
        'job',
        'address',
        'bi',
        'gender',
        'province',
        'phone_number'
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
    protected $casts = [];

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

    public function getFullNameAttribute()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
