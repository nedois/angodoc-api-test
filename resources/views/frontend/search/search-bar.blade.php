<div class="container text-center">
    <div class="logo-wrapper mb-3">
        <img src="{{asset('img/logo.svg')}}" alt="AngoDoc" height="200">
        <span>ANGODOC</span>
    </div>
    <h2 class="h2 h2-responsive mb-4 mb-lg-5">Encontre documentos perdidos na via pública</h2>
    <form class="mx-auto search-bar shadow-strong" method="GET" action="{{route('frontend.search.show')}}">
        @csrf
        <input type="search" name="reference" class="md-form" placeholder="Digite a referencia do documento" aria-label="Procurar">
        <span class="focus-border"><i></i></span>
        <button class="btn-search" type="submit"><i class="fas fa-search"></i></button>
    </form>
</div>
<div id="search-result"></div>
