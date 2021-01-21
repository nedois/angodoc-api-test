@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.frontend.questions'))

@section('content')
    <div class="container my-4">
        <div class="card bg-ango">
            <div class="d-none d-lg-block" style="position:absolute;width:100%;height:100%;background:right 5% center / contain no-repeat url('{{ asset('img/question.svg') }}')"></div>
            <div class="card-body">
                <h1 class="text-white">@lang('navs.frontend.questions')</h1>
                <p class="text-white">@lang('strings.frontend.questions.description')</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 my-4">
                <h2 class="h2 h2-responsive">@lang('strings.frontend.questions.what_is_angodoc')</h2>
                <p>@lang('strings.frontend.questions.definition')</p>
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading mb-4"><i class="fas fa-exclamation-circle mr-2"></i>@lang('strings.frontend.questions.important.title')</h4>
                    <p>@lang('strings.frontend.questions.important.description')</p>
                </div>
            </div>
        </div>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q1.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q1.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q2.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q2.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q3.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q3.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q4.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q4.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q5.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q5.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q6.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q6.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q7.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q7.answer')</p>
        <h4 class="h4 h4-responsive">@lang('strings.frontend.questions.q8.question')</h4>
        <p class="mb-4">@lang('strings.frontend.questions.q8.answer')</p>
    </div>
@endsection
