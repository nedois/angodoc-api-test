<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Finder extends JsonResource
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
        
        return [
            'id' => $this->id,
            'full_name' => $this->first_name.' '.$this->last_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'age' => $this->age,
            'job' => $this->job,
            'bi' => $this->bi,
            'address' => $this->address,
            'province' => $this->province,
            'telephone' => $this->telephone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'documents' => $this->when($withDocuments, $this->documents),
        ];
    }
}
