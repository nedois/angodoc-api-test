<!DOCTYPE html>
@langrtl
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
@else
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@endlangrtl

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', app_name())</title>
    <meta name="description" content="@yield('meta_description', 'Procure por documentos perdidos na via pública')">
    <meta name="author" content="@yield('meta_author', 'MSA')">
    @yield('meta')

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
        rel="stylesheet" />
        
    @stack('before-styles')

    @stack('after-styles')
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    @yield('content')

    <!-- Scripts -->
    @stack('before-scripts')
    {!! script(mix('js/manifest.js')) !!}
    {!! script(mix('js/vendor.js')) !!}
    {!! script(mix('js/dashboard.js')) !!}

    @stack('after-scripts')
</body>

</html>
