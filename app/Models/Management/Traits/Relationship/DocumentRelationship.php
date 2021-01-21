<?php

namespace App\Models\Management\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Management\Agency;
use App\Models\Management\Finder;

/**
 * Class DocumentRelationship.
 */
trait DocumentRelationship
{
    /**
     * Set document user relantionship
     * 
     * Return the document user
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return mixed
     */
    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * @return mixed
     */
    public function finder()
    {
        return $this->belongsTo(Finder::class);
    }
}
