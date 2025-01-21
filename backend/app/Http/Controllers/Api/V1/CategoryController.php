<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Category\StoreCategoryRequest;
use App\Http\Requests\Api\V1\Category\UpdateCategoryRequest;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    public function index(Service $service): AnonymousResourceCollection
    {
        $categories = $service->categories()->orderBy('display_order')->get();
        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request): CategoryResource
    {
        $lastOrder = Category::where('service_id', $request->service_id)
            ->max('display_order') ?? 0;

        $category = Category::create([
            'service_id' => $request->service_id,
            'name' => $request->name,
            'display_order' => $lastOrder + 1,
        ]);

        return new CategoryResource($category);
    }

    public function show(Category $category): CategoryResource
    {
        return new CategoryResource($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category): CategoryResource
    {
        $category->update([
            'name' => $request->name,
        ]);

        return new CategoryResource($category);
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(['message' => 'カテゴリを削除しました。']);
    }

    public function updateOrder(UpdateCategoryRequest $request, Service $service): JsonResponse
    {
        $orderedIds = $request->order;

        foreach ($orderedIds as $index => $id) {
            Category::where('id', $id)
                ->where('service_id', $service->id)
                ->update(['display_order' => $index + 1]);
        }

        return response()->json(['message' => '並び順を更新しました。']);
    }
}
