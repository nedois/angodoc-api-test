<?php

namespace App\JsonApi\v1\Users;

use App\Models\Auth\User;
use App\Scopes\AgencyScope;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use CloudCreativity\LaravelJsonApi\Eloquent\AbstractAdapter;
use CloudCreativity\LaravelJsonApi\Pagination\StandardStrategy;
use CloudCreativity\LaravelJsonApi\Eloquent\Concerns\SoftDeletesModels;

class Adapter extends AbstractAdapter
{
    use SoftDeletesModels;

    protected $defaultPagination = ['page' => 1];
    protected $softDeleteField = 'deleted_at';

    /**
     * Mapping of JSON API attribute field names to model keys.
     *
     * @var array
     */
    protected $attributes = [];

    /**
     * Resource relationship fields that can be filled.
     *
     * @var array
     */
    protected $relationships = [
        'agency'
    ];


    /**
     * Mapping of JSON API filter names to model scopes.
     *
     * @var array
     */
    protected $filterScopes = [];

    /**
     * Adapter constructor.
     *
     * @param StandardStrategy $paging
     */
    public function __construct(StandardStrategy $paging, AgencyScope $agencyScope)
    {
        $paging->withPageKey('page')->withPerPageKey('limit');

        parent::__construct(new User(), $paging);

        $this->addScopes($agencyScope);
    }

    /**
     * @param Builder $query
     * @param Collection $filters
     * @return void
     */
    protected function filter($query, Collection $filters)
    {
        if ($filters->has('bi')) {
            $query->where('users.active', 1)
                ->where('users.bi', 'like', '%' . $filters->get('bi') . '%');
        }

        if ($filters->has('only_trashed')) {
            $query->onlyTrashed()
                ->where('users.bi', 'like', '%' . $filters->get('only_trashed') . '%');
        }

        if ($filters->has('only_desactivated')) {
            $query->where('users.active', 0)
                ->where('users.bi', 'like', '%' . $filters->get('only_desactivated') . '%');
        }
    }

    protected function agency()
    {
        return $this->belongsTo();
    }
}
