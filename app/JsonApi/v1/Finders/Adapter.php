<?php

namespace App\JsonApi\v1\Finders;

use App\Scopes\AgencyScope;
use App\Models\Management\Finder;
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
        'creator',
        'documents',
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

        parent::__construct(new Finder(), $paging);

        $this->addScopes($agencyScope);
    }

    /**
     * @param Builder $query
     * @param Collection $filters
     * @return void
     */
    protected function filter($query, Collection $filters)
    {
        if ($filters->has('biOrName')) {
            $query->where('finders.bi', 'like', '%' . $filters->get('biOrName') . '%')
                ->orWhere('finders.first_name', 'like', '%' . $filters->get('biOrName') . '%')
                ->orWhere('finders.last_name', 'like', '%' . $filters->get('biOrName') . '%');
        }

        if ($filters->has('bi')) {
            $query->where('finders.bi', $filters->get('bi'));
        }
    }

    protected function creator()
    {
        return $this->belongsTo();
    }

    protected function documents()
    {
        return $this->hasMany();
    }

    protected function agency()
    {
        return $this->belongsTo();
    }
}
