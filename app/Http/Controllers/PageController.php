<?php

namespace App\Http\Controllers;

use App\Data\PageData;
use App\Models\Page;
use App\PageStatus;

class PageController extends Controller
{
    public function show($slug)
    {
        $page = Page::where('slug', $slug)->where('status', PageStatus::ACTIVE)->firstOrFail();

        return inertia('page/show', [
            'page' => PageData::from($page),
        ]);
    }

    public function aboutUs()
    {
        return inertia('page/about_us');
    }
}
