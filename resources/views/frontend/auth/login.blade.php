@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('labels.frontend.auth.login_box_title'))

@section('content')
<div class="container my-4">
    <div class="card bg-ango">
        <div class="d-none d-lg-block" style="position:absolute;width:100%;height:100%;background:right 5% center / contain no-repeat url('{{ asset('img/agency.svg') }}')"></div>
        <div class="card-body">
            <h1 class="text-white">@lang('labels.frontend.auth.login_box_title')</h1>
            <p class="text-white">@lang('strings.frontend.register.description')</p>
        </div>
    </div>
    <div class="mt-4 mb-8">

        {{ html()->form('POST', route('frontend.auth.login.post'))->open() }}
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        {{ html()->label(__('validation.attributes.frontend.email'))->for('email') }}
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-at"></i></span>
                            </div>
                            {{ html()->email('email')
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
                        {{ html()->label(__('validation.attributes.frontend.password'))->for('password') }}
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            {{ html()->password('password')
                            ->class('form-control')
                            ->placeholder(__('validation.attributes.frontend.password'))
                            ->required() }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <div class="checkbox">
                            {{ html()->label(html()->checkbox('remember', true, 1) . ' ' . __('labels.frontend.auth.remember_me'))->for('remember') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group clearfix">
                        <button class="btn btn-primary mt-3" type="submit">@lang('labels.frontend.auth.login_button')</button>
                    </div>
                </div>
            </div>

            @if(config('access.captcha.login'))
                <div class="row">
                    <div class="col">
                        @captcha
                        {{ html()->hidden('captcha_status', 'true') }}
                    </div>
                </div>
            @endif

            <div class="row">
                <div class="col">
                    <div class="form-group text-right">
                        <a href="{{ route('frontend.auth.password.reset') }}">@lang('labels.frontend.passwords.forgot_password')</a>
                    </div>
                </div>
            </div>
        {{ html()->form()->close() }}
    </div>
</div>
@endsection

@push('after-scripts')
    @if(config('access.captcha.login'))
        @captchaScripts
    @endif
@endpush
