<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Sale extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'user_formula_id',
        'user_id',
        'name',
        'lastname',
        'fullname',
        'email',
        'phone',
        'country',
        'department',
        'province',
        'district',
        'zip_code',
        'address',
        'number',
        'reference',
        'amount',
        'delivery',
        'bundle_discount',
        'bundle_id',
        'renewal_discount',
        'renewal_id',
        'coupon_discount',
        'coupon_id',
        'total_amount',
        'billing_type',
        'billing_number',
        'status_id',
        'origin',
        'origin_comment',
        'courier',
        'courier_amount',
        'pickup',
        'pickup_amount'
    ];

    public function formula(): BelongsTo
    {
        return $this->belongsTo(UserFormula::class, 'user_formula_id', 'id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    public function bundle(): BelongsTo
    {
        return $this->belongsTo(Bundle::class);
    }

    public function renewal(): BelongsTo
    {
        return $this->belongsTo(Renewal::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(SaleDetail::class);
    }
}
