<?php

namespace App\JsonApi\v1\Finders;

use App\Models\Management\Finder;
use Neomerx\JsonApi\Schema\SchemaProvider;

class Schema extends SchemaProvider
{

    /**
     * @var string
     */
    protected $resourceType = 'finders';

    /**
     * @param Finder $resource
     *      the domain record being serialized.
     * @return string
     */
    public function getId($resource)
    {
        return (string) $resource->getRouteKey();
    }

    /**
     * @param Finder $resource
     *      the domain record being serialized.
     * @return array
     */
    public function getAttributes($resource)
    {
        return [
            'creator' => $resource->user_id,
            'first_name' => $resource->first_name,
            'last_name' => $resource->last_name,
            'age' => $resource->age,
            'job' => $resource->job,
            'address' => $resource->address,
            'bi' => $resource->bi,
            'gender' => $resource->gender,
            'province' => $resource->province,
            'phone_number' => $resource->phone_number,
            'created_at' => $resource->created_at->toAtomString(),
            'updated_at' => $resource->updated_at->toAtomString(),
            'deleted_at' => $resource->deleted_at ? $resource->deleted_at->toAtomString() : null,
        ];
    }

    /**
     * @param Finder $resource
     * @param bool $isPrimary
     * @param array $includedRelationships
     * @return array
     */
    public function getRelationships($resource, $isPrimary, array $includedRelationships)
    {
        return [
            'creator' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['creator']),
                self::DATA => function () use ($resource) {
                    return $resource->creator;
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
            'agency' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['agency']),
                self::DATA => function () use ($resource) {
                    return $resource->agency;
                }
            ]
        ];
    }
}
