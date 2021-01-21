<?php

namespace App\JsonApi\v1\Users;

use App\Models\Auth\User;
use Neomerx\JsonApi\Schema\SchemaProvider;

class Schema extends SchemaProvider
{

    /**
     * @var string
     */
    protected $resourceType = 'users';

    /**
     * @param User $resource
     *      the domain record being serialized.
     * @return string
     */
    public function getId($resource)
    {
        return (string) $resource->getRouteKey();
    }

    /**
     * @param User $resource
     *      the domain record being serialized.
     * @return array
     */
    public function getAttributes($resource)
    {
        return [
            'uuid' => $resource->uuid,
            'agency' => $resource->agency_id,
            'first_name' => $resource->first_name,
            'last_name' => $resource->last_name,
            'full_name' => $resource->full_name,
            'bi' => $resource->bi,
            'active' => $resource->active,
            'email' => $resource->email,
            'phone_number' => $resource->phone_number,
            'gender' => $resource->gender,
            'address' => $resource->address,
            'province' => $resource->province,
            'avatar_type' => $resource->avatar_type,
            'avatar_location' => $resource->avatar_location,
            'email_verified_at' => $resource->email_verified_at ? $resource->email_verified_at->toAtomString() : null,
            'created_at' => $resource->created_at->toAtomString(),
            'updated_at' => $resource->updated_at->toAtomString(),
            'deleted_at' => $resource->deleted_at ? $resource->deleted_at->toAtomString() : null,
            'roles' => $resource->roles
        ];
    }

    /**
     * @param User $resource
     * @param bool $isPrimary
     * @param array $includedRelationships
     * @return array
     */
    public function getRelationships($resource, $isPrimary, array $includedRelationships)
    {
        return [
            'agency' => [
                self::SHOW_SELF => true,
                self::SHOW_RELATED => true,
                self::SHOW_DATA => isset($includedRelationships['agency']),
                self::DATA => function () use ($resource) {
                    return $resource->agency;
                },
            ]
        ];
    }
}
