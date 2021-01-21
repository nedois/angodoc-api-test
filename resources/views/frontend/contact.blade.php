@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.general.home'))

@section('content')
<div class="container my-4">
    <div class="card bg-ango">
        <div class="d-none d-lg-block" style="position:absolute;width:100%;height:100%;background:right 5% center / contain no-repeat url('{{ asset('img/contact.svg') }}')"></div>
        <div class="card-body">
            <h1 class="text-white">@lang('labels.frontend.contact.box_title')</h1>
            <p class="text-white">@lang('strings.frontend.contact.description')</p>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-12 col-lg-6 ">
            {{ html()->form('POST', route('frontend.contact.send'))->open() }}
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            {{ html()->label(__('validation.attributes.frontend.name'))->for('name') }}
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                {{ html()->text('name', optional(auth()->user())->name)
                                ->class('form-control')
                                ->placeholder(__('validation.attributes.frontend.name'))
                                ->attribute('maxlength', 191)
                                ->required() }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            {{ html()->label(__('validation.attributes.frontend.email'))->for('email') }}
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-at"></i></span>
                                </div>
                                {{ html()->email('email', optional(auth()->user())->email)
                                ->class('form-control')
                                ->placeholder(__('validation.attributes.frontend.email'))
                                ->attribute('maxlength', 191)
                                ->required() }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            {{ html()->label(__('validation.attributes.frontend.phone'))->for('phone') }}
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                </div>
                                {{ html()->text('phone')
                                ->class('form-control')
                                ->placeholder(__('validation.attributes.frontend.phone'))
                                ->attribute('maxlength', 191)
                                ->required() }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            {{ html()->label(__('validation.attributes.frontend.message'))->for('message') }}

                            {{ html()->textarea('message')
                                ->class('form-control')
                                ->placeholder(__('validation.attributes.frontend.message'))
                                ->attribute('rows', 3)
                                ->required() }}
                        </div>
                    </div>
                </div>

                @if(config('access.captcha.contact'))
                    <div class="row">
                        <div class="col">
                            @captcha
                            {{ html()->hidden('captcha_status', 'true') }}
                        </div>
                    </div>
                @endif

                <div class="row">
                    <div class="col">
                        <div class="form-group mb-0 clearfix">
                            <button class="btn btn-primary mt-3" type="submit">@lang('labels.frontend.contact.button')</button>
                        </div>
                    </div>
                </div>
            {{ html()->form()->close() }}
        </div>
        <div class="col-12 col-md-6 p-lg-4">
            <div class="contact"></div>
        </div>
    </div>
</div>
@endsection
