@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.general.home'))

@section('content')
    <section class="search-section mt--6 mb-5">
        @include('frontend.search.search-bar')
    </section>
@endsection
