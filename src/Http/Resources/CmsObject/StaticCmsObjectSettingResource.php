<?php

namespace Jkli\Cms\Http\Resources\CmsObject;

use Illuminate\Http\Resources\Json\JsonResource;

class StaticCmsObjectSettingResource extends JsonResource
{

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'type' => $this->resource::type(),
            'component' => $this->resource::component(),
            'serverValidation' => $this->resource::serversideValidation(),
        ];
    }
}