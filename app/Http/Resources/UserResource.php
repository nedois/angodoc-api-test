<?php

namespace App\Http\Resources;

use App\Models\Auth\Role;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\Agency as AgencyResource;

class UserResource extends JsonResource
{
    /**
     * The 'data' wrapper that should be applied.
     *
     * @var string
     */
    public static $wrap = '';

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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'bi' => $this->bi,
            'telephone' => $this->telephone,
            'avatar_type' => $this->avatar_type,
            'avatar_location' => $this->avatar_location,
            'password_changed_at' => $this->password_changed_at,
            'active' => $this->active,
            'confirmed' => $this->confirmed,
            'last_login_at' => $this->last_login_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
