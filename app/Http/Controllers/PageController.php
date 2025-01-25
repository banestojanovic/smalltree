<?php

namespace App\Http\Controllers;

use App\Data\PageData;
use App\Models\Page;
use App\PageStatus;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function show()
    {
        $page = Page::where('slug', collect(request()->all())->keys()->first())->where('status', PageStatus::ACTIVE)->firstOrFail();

        return inertia('page/show', [
            'page' => PageData::from($page),
        ]);
    }

    public function aboutUs()
    {
        return inertia('page/about_us');
    }

    public function terms()
    {
        $locale = app()->getLocale();

        return inertia('page/terms', [
            'document' => Str::markdown(File::get(storage_path("/app/public/site/documents/legal/$locale/terms.md"))),
        ]);
    }

    public function privacyPolicy()
    {
        $locale = app()->getLocale();

        return inertia('page/privacy_policy', [
            'document' => Str::markdown(File::get(storage_path("/app/public/site/documents/legal/$locale/privacy-policy.md"))),
        ]);
    }
}
