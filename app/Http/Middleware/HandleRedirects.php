<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class HandleRedirects
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = trim($request->url(), '/');
        info($path);
        $redirect = DB::table('redirects')->where('old_slug', $path)->first();

        if ($redirect) {
            return redirect($redirect->new_url, 301);
        }

        return $next($request);
    }
}
