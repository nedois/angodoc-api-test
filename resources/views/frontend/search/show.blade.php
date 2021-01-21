@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('search.result'))

@section('content')
    <section class="container">
        <h1 class="h1 h1-responsive">Resultado da pesquisa de: {{ $reference }}</h1>
        @if ($document)
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-3">Informações sobre o documento</h3>
                    <div class="form-group row">
                        <div class="col-12 mb-3">
                            <label for="owner">Nome no documento</label>
                            <input id="owner" type="text" class="form-control" value="{{$document->owner}}" disabled>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="name">Referência</label>
                            <input id="name" type="text" class="form-control" value="{{$document->reference}}" disabled>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="type">Tipo de documento</label>
                            <input id="type" type="text" class="form-control" value="{{$document->type}}" disabled>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="date_issue">Data de emissão</label>
                            <input id="date_issue" type="text" class="form-control" value="{{$document->date_emission}}" disabled>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="date_found">Data de registro</label>
                            <input id="date_found" type="text" class="form-control" value="{{$document->created_at}}" disabled>
                        </div>
                    </div>
                    <h3 class="card-title mb-3">Onde recuperar o documento?</h3>
                    <div class="form-group row">
                        <div class="col-lg-12 mb-3">
                            <label for="name">Nome da agência</label>
                            <input id="name" type="text" class="form-control" value="{{$document->agency->name}}" disabled>
                        </div>
                        <div class="col-lg-12 mb-3">
                            <label for="phone">Endereço</label>
                            <input id="phone" type="text" class="form-control" value="{{$document->agency->address}}" disabled>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <h2 class="h2 h2-responsive">Nenhum documento encontrado</h2>
            <p>A referencia do documento não está correcta ou o seu documento ainda não foi levado as nossas agências.</p>
        @endif
    </section>
@endsection

@push('after-scripts')
    @if(config('access.captcha.contact'))
        @captchaScripts
    @endif
@endpush

