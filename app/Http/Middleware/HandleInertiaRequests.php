<?php

namespace App\Http\Middleware;

use App\Data\CartData;
use App\Data\CategoryData;
use App\Data\GlobalData;
use App\Data\UserData;
use App\Models\Category;
use App\Support\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => UserData::optional($request->user()),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'cart' => CartData::optional((new Cart)->getCart()),
            'global' => fn () => GlobalData::optional([
                'env' => config('app.env'),
                'action' => session()->get('action'),
                'categories' => CategoryData::collect(Category::with('cover')->whereNull('parent_id')->get()),
            ]),
            'flash' => fn () => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
            ],
        ];
    }
}
