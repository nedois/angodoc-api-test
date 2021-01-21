<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Agency extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $withDocuments = boolval($request->withDocuments ) || false;
        $withUsers = boolval($request->withUsers ) || false;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'manager' => [
                'id' => $this->user->id,
                'full_name' => $this->user->full_name
            ],
            'address' => $this->address,
            'province' => $this->province,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'documents' => $this->when($withDocuments, $this->documents),
            'users' => $this->when($withUsers, $this->users)
        ];
    }
}
