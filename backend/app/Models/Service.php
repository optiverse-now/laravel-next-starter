<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'display_order',
    ];

    protected $casts = [
        'display_order' => 'integer',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function apiKeys(): HasMany
    {
        return $this->hasMany(ApiKey::class);
    }
}
