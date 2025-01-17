<?php

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

function __($key = null, $replace = [], $locale = null)
{
    if (is_null($key)) {
        return $key;
    }
    if (trans()->has($key)) {
        return trans($key, $replace, $locale);
    }

    $search = Arr::get(trans()->get('*'), $key);
    if ($search !== null) {
        return trans_replacements($search, $replace);
    }

    $fallback = Arr::get(trans()->get('*', [], config('app.fallback_locale')), $key);
    if ($fallback !== null) {
        return trans_replacements($fallback, $replace);
    } else {
        return $key;
    }
}

function trans_replacements($line, array $replace)
{
    if (empty($replace)) {
        return $line;
    }

    $shouldReplace = [];

    foreach ($replace as $key => $value) {
        $shouldReplace[':'.Str::ucfirst($key)] = Str::ucfirst($value);
        $shouldReplace[':'.Str::upper($key)] = Str::upper($value);
        $shouldReplace[':'.$key] = $value;
    }

    return strtr($line, $shouldReplace);
}

function trans_choice($key, $number, array $replace = [], $locale = null)
{
    $message = __($key, $replace, $locale);

    if (is_array($number) || $number instanceof Countable) {
        $number = count($number);
    }

    $replace['count'] = $number;

    return trans_replacements(
        trans()->getSelector()->choose($message, $number, $locale = App::getLocale()),
        $replace
    );
}
