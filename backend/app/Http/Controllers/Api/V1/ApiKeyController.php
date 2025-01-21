<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ApiKey\StoreApiKeyRequest;
use App\Http\Resources\Api\V1\ApiKeyResource;
use App\Models\ApiKey;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ApiKeyController extends Controller
{
    public function index(Service $service)
    {
        $apiKeys = $service->apiKeys()->latest()->get();
        return ApiKeyResource::collection($apiKeys);
    }

    public function store(StoreApiKeyRequest $request)
    {
        $apiKey = new ApiKey($request->validated());
        $apiKey->key = Str::uuid()->toString();
        $apiKey->save();

        return (new ApiKeyResource($apiKey))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(ApiKey $apiKey): JsonResponse
    {
        $apiKey->delete();
        return response()->json(null, 204);
    }
}
