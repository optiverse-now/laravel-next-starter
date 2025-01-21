<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Service\StoreServiceRequest;
use App\Http\Requests\Api\V1\Service\UpdateServiceRequest;
use App\Http\Resources\Api\V1\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $services = Service::orderBy('display_order')->get();
        return ServiceResource::collection($services);
    }

    public function store(StoreServiceRequest $request): ServiceResource
    {
        $lastOrder = Service::max('display_order') ?? 0;

        $service = Service::create([
            'name' => $request->name,
            'display_order' => $lastOrder + 1,
        ]);

        return new ServiceResource($service);
    }

    public function show(Service $service): ServiceResource
    {
        return new ServiceResource($service);
    }

    public function update(UpdateServiceRequest $request, Service $service): ServiceResource
    {
        $service->update([
            'name' => $request->name,
        ]);

        return new ServiceResource($service);
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();
        return response()->json(['message' => 'サービスを削除しました。']);
    }

    public function updateOrder(UpdateServiceRequest $request): JsonResponse
    {
        $orderedIds = $request->order;

        foreach ($orderedIds as $index => $id) {
            Service::where('id', $id)->update(['display_order' => $index + 1]);
        }

        return response()->json(['message' => '並び順を更新しました。']);
    }
}
