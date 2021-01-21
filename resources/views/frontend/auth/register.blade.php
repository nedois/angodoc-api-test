@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('labels.frontend.auth.register_box_title'))

@section('content')
<div class="container my-4">
    <div class="card bg-ango">
        <div class="d-none d-lg-block" style="position:absolute;width:100%;height:100%;background:right 5% center / contain no-repeat url('{{ asset('img/agency.svg') }}')"></div>
        <div class="card-body">
            <h1 class="text-white">@lang('labels.frontend.auth.register_box_title')</h1>
            <p class="text-white">@lang('strings.frontend.register.description')</p>
        </div>
    </div>

    <div class="mt-4 mb-8">
        {{ html()->form('POST', route('frontend.auth.register.post'))->open() }}

        <div class="row">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    {{ html()->label(__('validation.attributes.frontend.first_name'))->for('first_name') }}
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                        </div>
                        {{ html()->text('first_name')
                            ->class('form-control')
                            ->placeholder(__('validation.attributes.frontend.first_name'))
                            ->attribute('maxlength', 191)
                            ->required()}}
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="form-group">
                    {{ html()->label(__('validation.attributes.frontend.last_name'))->for('last_name') }}
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-signature"></i></span>
                        </div>
                        {{ html()->text('last_name')
                        ->class('form-control')
                        ->placeholder(__('validation.attributes.frontend.last_name'))
                        ->attribute('maxlength', 191)
                        ->required() }}
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    {{ html()->label(__('validation.attributes.frontend.province'))->for('province') }}
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                        </div>
                        {{ html()->select('province', [
                            'Bengo' => 'Bengo',
                            'Benguela' => 'Benguela',
                            'Bié' => 'Bié',
                            'Cabinda' => 'Cabinda',
                            'Cuando-Cubango' => 'Cuando-Cubango',
                            'Cuanza Norte' => 'Cuanza Norte',
                            'Cuanza Sul' => 'Cuanza Sul',
                            'Cunene' => 'Cunene',
                            'Huambo' => 'Huambo',
                            'Huíla' => 'Huíla',
                            'Luanda' => 'Luanda',
                            'Lunda Norte' => 'Lunda Norte',
                            'Lunda Sul' => 'Lunda Sul',
                            'Malanje' => 'Malanje',
                            'Moxico' => 'Moxico',
                            'Namibe' => 'Namibe',
                            'Uíge' => 'Uíge',
                            'Zaire' => 'Zaire'], 'Luanda')
                            ->class('form-control')
                            ->required() }}
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="form-group">
                    {{ html()->label(__('validation.attributes.frontend.agency'))->for('agency_id') }}
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                        </div>
                        {{ html()->select('agency_id', $agencies)
                        ->class('form-control')
                        ->required()
                        }}
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
                    {{ html()->label(__('validation.attributes.frontend.password_confirmation'))->for('password_confirmation') }}
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        {{ html()->password('password_confirmation')
                            ->class('form-control')
                            ->placeholder(__('validation.attributes.frontend.password_confirmation'))
                            ->required() }}
                    </div>
                </div>
            </div>
        </div>

        @if(config('access.captcha.registration'))
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
                    <button class="btn btn-primary mt-3" type="submit">@lang('labels.frontend.auth.register_button')</button>
                </div>
            </div>
        </div>

        {{ html()->form()->close() }}
    </div>
</div>
@endsection

@push('after-scripts')
    @if(config('access.captcha.registration'))
        @captchaScripts
    @endif
@endpush
