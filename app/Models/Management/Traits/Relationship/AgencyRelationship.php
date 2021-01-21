<?php

namespace App\Models\Management\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Management\Document;

/**
 * Class AgencyRelationship.
 */
trait AgencyRelationship
{
    /**
     * Set user agency relantionship
     * 
     * Return the agency director
     */
    public function director()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Set user agency relantionship
     * 
     * Return the user's agency
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Set user agency relantionship
     * 
     * Return the user's agency
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
