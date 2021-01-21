<?php

namespace App\JsonApi\v1\Agencies;

use App\Scopes\AgencyScope;
use App\Models\Management\Agency;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use CloudCreativity\LaravelJsonApi\Eloquent\AbstractAdapter;
use CloudCreativity\LaravelJsonApi\Pagination\StandardStrategy;

class Adapter extends AbstractAdapter
{
    protected $defaultPagination = ['page' => 1];
    protected $softDeleteField = 'deleted_at';
    
    /**
     * Mapping of JSON API attribute field names to model keys.
     *
     * @var array
     */
    protected $attributes = [];

    /**
     * Mapping of JSON API filter names to model scopes.
     *
     * @var array
     */
    protected $filterScopes = [];

    /**
     * Resource relationship fields that can be filled.
     *
     * @var array
     */
    protected $relationships = [
        'director',
        'documents',
        'users'
    ];

    /**
     * Adapter constructor.
     *
     * @param StandardStrategy $paging
     */
    public function __construct(StandardStrategy $paging)
    {
        $paging->withPageKey('page')->withPerPageKey('limit');

        parent::__construct(new Agency(), $paging);
    }

    /**
     * @param Builder $query
     * @param Collection $filters
     * @return void
     */
    protected function filter($query, Collection $filters)
    {
        if ($filters->has('name')) {
            $query->where('agencies.name', 'like', '%' . $filters->get('name') . '%');
        }
    }

    protected function users()
    {
        return $this->hasMany();
    }

    protected function director()
    {
        return $this->belongsTo();
    }

    protected function documents()
    {
        return $this->hasMany();
    }
}
