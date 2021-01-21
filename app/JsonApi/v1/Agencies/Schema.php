<?php

namespace App\JsonApi\v1\Agencies;

use App\Models\Management\Agency;
use Neomerx\JsonApi\Schema\SchemaProvider;

class Schema extends SchemaProvider
{

    /**
     * @var string
     */
    protected $resourceType = 'agencies';

    /**
     * @param Agency $resource
     *      the domain record being serialized.
     * @return string
     */
    public function getId($resource)
    {
        return (string) $resource->getRouteKey();
    }

    /**
     * @param Agency $resource
     *      the domain record being serialized.
     * @return array
     */
    public function getAttributes($resource)
    {
        return [
            'director' => $resource->user_id,
            'name' => $resource->name,
            'address' => $resource->address,
            'province' => $resource->province,
            'schedule' => $resource->schedule,
            'created_at' => $resource->created_at->toAtomString(),
            'updated_at' => $resource->updated_at->toAtomString(),
            'deleted_at' => $resource->deleted_at ? $resource->deleted_at->toAtomString() : null,
        ];
    }

    /**
     * @param \App\Models\Agency $resource
     * @param bool $isPrimary
     * @param array $includedRelationships
     * @return array
     */
    public function getRelationships($resource, $isPrimary, array $includedRelationships)
    {
        return [
            'director' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['director']),
                self::DATA => function () use ($resource) {
                    return $resource->director;
                }
            ],
            'documents' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['documents']),
                self::DATA => function () use ($resource) {
                    return $resource->documents;
                }
            ],
            'users' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => false
            ]
        ];
    }
}
