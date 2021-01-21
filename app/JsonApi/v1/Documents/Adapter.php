<?php

namespace App\JsonApi\v1\Documents;

use App\Scopes\AgencyScope;
use Illuminate\Support\Collection;
use App\Models\Management\Document;
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
        'finder',
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

        parent::__construct(new Document(), $paging);

        $this->addScopes($agencyScope);
    }

    /**
     * @param Builder $query
     * @param Collection $filters
     * @return void
     */
    protected function filter($query, Collection $filters)
    {
        if ($filters->has('reference')) {
            $query->whereNull('documents.recovered_at')
                ->where('documents.reference', 'like', '%' . $filters->get('reference') . '%');
        }

        if ($filters->has('with_trashed')) {
            $query->withTrashed()
                ->where('documents.reference', 'like', '%' . $filters->get('with_trashed') . '%');
        }

        if ($filters->has('only_trashed')) {
            $query->onlyTrashed()
                ->where('documents.reference', 'like', '%' . $filters->get('only_trashed') . '%');
        }

        if ($filters->has('only_recovered')) {
            $query->where('documents.recovered_at', '!=', null)
                ->where('documents.reference', 'like', '%' . $filters->get('only_recovered') . '%');
        }
    }

    protected function creator()
    {
        return $this->belongsTo();
    }

    protected function finder()
    {
        return $this->belongsTo();
    }

    protected function agency()
    {
        return $this->belongsTo();
    }
}
