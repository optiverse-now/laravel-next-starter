<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Media\StoreMediaRequest;
use App\Http\Resources\Api\V1\MediaResource;
use App\Models\Media;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Service $service)
    {
        $media = $service->media()->latest()->paginate(20);
        return MediaResource::collection($media);
    }

    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileName = $request->input('name') ?? $file->getClientOriginalName();
        $path = $file->storeAs(
            'media',
            Str::uuid() . '.' . $extension,
            'public'
        );

        $media = new Media([
            'service_id' => $request->input('service_id'),
            'name' => $fileName,
            'file_path' => $path,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);
        $media->save();

        return (new MediaResource($media))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Media $media): JsonResponse
    {
        Storage::disk('public')->delete($media->file_path);
        $media->delete();
        return response()->json(null, 204);
    }
}
