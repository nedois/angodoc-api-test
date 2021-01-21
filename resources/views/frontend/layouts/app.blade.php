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
        <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap"
            rel="stylesheet"
        />
        @stack('before-styles')
        <link rel="stylesheet" type="text/css" href="{{ asset('css/angodoc.min.css') }}" >
        {{ style(mix('css/frontend.css')) }}

        @stack('after-styles')
    </head>
    <body>
        <div class="container mt-5 pt-5">
            @include('includes.partials.messages')
        </div><!-- container -->

        @yield('content')

        <!-- Scripts -->
        @stack('before-scripts')
        {!! script(mix('js/manifest.js')) !!}
        {!! script(mix('js/vendor.js')) !!}
        {!! script(mix('js/frontend.js')) !!}
        @stack('after-scripts')

        @include('includes.partials.ga')
    </body>
</html>
