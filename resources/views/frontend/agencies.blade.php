@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.frontend.agencies'))

@section('content')
<div class="container my-4">
    <div class="card bg-ango">
        <div class="d-none d-lg-block" style="position:absolute;width:100%;height:100%;background:right 5% center / contain no-repeat url('{{ asset('img/agency.svg') }}')"></div>
        <div class="card-body">
            <h1 class="text-white">@lang('navs.frontend.agencies')</h1>
            <p class="text-white">@lang('strings.frontend.agencies.description')</p>
        </div>
    </div>
    <div class="mt-4">
        @foreach($agencies as $agency)
            @if ($loop->first)
                <h2 class="my-4">{{$agency->province}}</h2>
                @php
                    $lastProvince = $agency->province;
                @endphp
                <div class="row">
            @endif

            @if ($agency->province != $lastProvince)
                </div>
                <h2 class="my-4">{{$agency->province}}</h2>
                @php
                    $lastProvince = $agency->province;
                @endphp
                <div class="row">
            @endif
            <div class="col-12 col-lg-4">
                <div class="card border-light">
                    <div class="card-body">
                        <div class="card-title"><strong>{{$agency->name}}</strong></div>
                        <p class="mb-0">Endereço: {{$agency->address}}</p>
                        <p class="mb-0">Telefone: +244 923 522 364</p>
                    </div>
                </div>
            </div>
        @endforeach
        </div>
    </div>
</div>
@endsection
