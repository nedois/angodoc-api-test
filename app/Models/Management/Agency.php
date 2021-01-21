<?php

namespace App\Models\Management;

use App\Models\Auth\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\Management\Traits\Relationship\AgencyRelationship;

class Agency extends Model
{
    use AgencyRelationship;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'province',
        'schedule'
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
        'schedule' => 'array'
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

    /**
     * Set the agency director
     */
    public function setDirector(User $user)
    {
        if (isset($this->director)) {
            $this->director->assignRole(config('access.roles.operator'));
        }

        $this->user_id = $user->id;
        $this->save();

        $user->setAgency($this);
        $user->assignRole(config('access.roles.director'));

        return $this;
    }
}
