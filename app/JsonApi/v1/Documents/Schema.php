<?php

namespace App\JsonApi\v1\Documents;

use App\Models\Management\Document;
use Neomerx\JsonApi\Schema\SchemaProvider;

class Schema extends SchemaProvider
{

    /**
     * @var string
     */
    protected $resourceType = 'documents';

    /**
     * @param Document $resource
     *      the domain record being serialized.
     * @return string
     */
    public function getId($resource)
    {
        return (string) $resource->getRouteKey();
    }

    /**
     * @param Document $resource
     *      the domain record being serialized.
     * @return array
     */
    public function getAttributes($resource)
    {
        return [
            'reference' => $resource->reference,
            'creator' => $resource->creator->full_name,
            'finder' => $resource->finder->full_name,
            'agency' => $resource->agency->name,
            'recovered_at' => $resource->recovered_at ? $resource->recovered_at->toAtomString() : null,
            'owner' => $resource->owner,
            'document_type' => $resource->type,
            'date_emission' => $resource->date_emission->toAtomString(),
            'commentary' => $resource->commentary,
            'created_at' => $resource->created_at->toAtomString(),
            'updated_at' => $resource->updated_at->toAtomString(),
            'deleted_at' => $resource->deleted_at ? $resource->deleted_at->toAtomString() : null,
        ];
    }

    /**
     * @param Document $resource
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
            'finder' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['finder']),
                self::DATA => function () use ($resource) {
                    return $resource->finder;
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
