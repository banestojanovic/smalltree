<?php

namespace App\Http\Controllers;

use App\Data\PostData;
use App\Models\Post;

class PostController extends Controller
{
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $posts = PostData::collect(Post::query()
            ->with('cover', 'categories')
            ->active()
            ->paginate(18)
        );

        $featurePost = PostData::from(Post::with('cover')->active()->inRandomOrder()->first());

        return inertia('post/index', [
            'posts' => $posts,
            'featurePost' => $featurePost,
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
            ->take(6)
            ->get()
        );

        return inertia('post/show', [
            'post' => PostData::from($post),
            'recommendedPosts' => $recommendedPosts,
        ]);
    }
}
