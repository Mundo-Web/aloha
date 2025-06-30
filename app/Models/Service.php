<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'price',
        'price_first_year',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'price_first_year' => 'decimal:2'
    ];

    public function features()
    {
        return $this->hasManyThrough(Feature::class, ServiceHasFeature::class, 'service_id', 'id', 'id', 'feature_id')
            ->select([
                'features.*',
                'service_has_features.value',
            ]);
    }
}
