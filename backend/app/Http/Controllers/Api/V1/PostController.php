<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Post\StorePostRequest;
use App\Http\Requests\Api\V1\Post\UpdatePostRequest;
use App\Http\Resources\Api\V1\PostResource;
use App\Models\Post;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(Service $service, Request $request): AnonymousResourceCollection
    {
        $query = $service->posts()
            ->with(['categories', 'eyecatchMedia', 'user'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->input('status'));
            })
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->whereHas('categories', function ($query) use ($request) {
                    $query->where('categories.id', $request->input('category_id'));
                });
            })
            ->when($request->filled('from_date'), function ($query) use ($request) {
                $query->where('published_at', '>=', $request->input('from_date'));
            })
            ->when($request->filled('to_date'), function ($query) use ($request) {
                $query->where('published_at', '<=', $request->input('to_date'));
            })
            ->when($request->filled('sort') && $request->filled('direction'), function ($query) use ($request) {
                $query->orderBy($request->input('sort'), $request->input('direction'));
            }, function ($query) {
                $query->latest('updated_at');
            });

        return PostResource::collection($query->paginate(20));
    }

    public function store(StorePostRequest $request): PostResource
    {
        $post = Post::create([
            'service_id' => $request->service_id,
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status,
            'eyecatch_media_id' => $request->eyecatch_media_id,
            'published_at' => $request->status === 'published' ? ($request->published_at ?? now()) : null,
        ]);

        if ($request->has('category_ids')) {
            $post->categories()->sync($request->category_ids);
        }

        return new PostResource($post->load(['categories', 'eyecatchMedia', 'user']));
    }

    public function show(Post $post): PostResource
    {
        return new PostResource($post->load(['categories', 'eyecatchMedia', 'user']));
    }

    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status,
            'eyecatch_media_id' => $request->eyecatch_media_id,
            'published_at' => $request->status === 'published' ? ($request->published_at ?? now()) : null,
        ]);

        if ($request->has('category_ids')) {
            $post->categories()->sync($request->category_ids);
        }

        return new PostResource($post->load(['categories', 'eyecatchMedia', 'user']));
    }

    public function destroy(Post $post): JsonResponse
    {
        $post->delete();
        return response()->json(['message' => '記事を削除しました。']);
    }
}
