<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Document extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'created_by' => [
                'id' => $this->user->id,
                'full_name' => $this->user->full_name,
            ],
            'found_by' => [
                'id' => $this->finder->id,
                'full_name' => $this->finder->first_name . ' ' . $this->finder->last_name,
                'age' => $this->finder->age,
                'job' => $this->finder->job,
                'address' => $this->finder->address,
                'province' => $this->finder->province,
                'telephone' => $this->finder->telephone,
                'bi' => $this->finder->bi
            ],
            'agency' => [
                'id' => $this->agency->id,
                'name' => $this->agency->name,
                'address' => $this->agency->address,
                'province' => $this->agency->province,

            ],
            'owner' => $this->owner,
            'type' => $this->type,
            'recovered' => $this->recovered,
            'date_emission' => $this->date_emission,
            'commentary' => $this->commentary,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'deleted_at' => $this->deleted_at ? $this->deleted_at->diffForHumans() : null
        ];
    }
}
