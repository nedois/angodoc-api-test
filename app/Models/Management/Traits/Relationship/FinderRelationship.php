<?php

namespace App\Models\Management\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Management\Agency;
use App\Models\Management\Document;

/**
 * Class FinderRelationship.
 */
trait FinderRelationship
{
    /**
     * Set user finder relantionship
     * 
     * Return the user who registered the finder
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Set agency finder relantionship
     * 
     * Return the agency where the finder is registered
     */
    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * Set finder documents relantionship
     * 
     * Return the finder's documents
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
