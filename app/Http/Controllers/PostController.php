<?php

namespace App\Http\Controllers;

use App\Data\PostCategoryData;
use App\Data\PostData;
use App\Models\Post;
use App\Models\PostCategory;

class PostController extends Controller
{
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $categories = PostCategoryData::collect(PostCategory::all());

        $posts = PostData::collect(Post::query()
            ->with('cover', 'categories')
            ->when(! empty(request('category')), fn ($q) => $q->whereHas('categories', fn ($q) => $q->where('slug', request('category'))))
            ->latest()
            ->active()
            ->paginate(12)
        );

        return inertia('post/index', [
            'posts' => $posts,
            'categories' => $categories,
            'category' => PostCategoryData::optional(PostCategory::where('slug', request('category'))->first()),
            'query' => [
                'category' => request('category') ?? null,
            ],
        ]);
    }

    public function show($slug): \Inertia\Response|\Inertia\ResponseFactory
    {
        $post = Post::with('cover', 'categories')->where('slug', $slug)->active()->firstOrFail();

        $recommendedPosts = PostData::collect(Post::query()
            ->with('categories', 'cover')
            ->inRandomOrder()
            ->whereHas('categories', function ($q) use ($post) {
                $q->whereIn('post_categories.id', $post->categories->pluck('id')->toArray());
            })
            ->take(3)
            ->get()
        );

        return inertia('post/show', [
            'post' => PostData::from($post),
            'recommendedPosts' => $recommendedPosts,
        ]);
    }
}
