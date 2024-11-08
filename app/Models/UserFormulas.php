<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFormulas extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'email',
        'has_treatment',
        'scalp_type',
        'hair_type',
        'hair_goals',
        'fragrance_id',
        'status',
    ];

    protected $casts = [
        'hair_goals' => 'array',
    ];

    public function hasTreatment()
    {
        return $this->hasOne(Formula::class, 'id', 'has_treatment');
    }
    public function scalpType()
    {
        return $this->hasOne(Formula::class, 'id', 'scalp_type');
    }
    public function hairType()
    {
        return $this->hasOne(Formula::class, 'id', 'hair_type');
    }
    public function fragrance()
    {
        return $this->hasOne(Fragrance::class, 'id', 'fragrance_id');
    }
}
