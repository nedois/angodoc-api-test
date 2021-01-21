<footer class="bg-ango footer mt-5">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-4">
                <h5 class="h5 text-ango-50">Links uteis</h5>
                <ul class="list-unstyled">
                    <li>
                        <i class="fas fa-chevron-right mr-2"></i>
                        <a href="{{route('frontend.index')}}" class="text-white normal">@lang('navs.frontend.index')</a>
                    </li>
                    <li>
                        <i class="fas fa-chevron-right mr-2"></i>
                        <a href="{{route('frontend.commonquestions')}}" class="text-white normal">@lang('navs.frontend.questions')</a>
                    </li>
                    <li>
                        <i class="fas fa-chevron-right mr-2"></i>
                        <a href="{{route('frontend.agencies')}}" class="text-white normal">@lang('navs.frontend.agencies')</a>
                    </li>
                    <li>
                        <i class="fas fa-chevron-right mr-2"></i>
                        <a href={{route('frontend.contact')}} class="text-white normal">@lang('navs.frontend.contact')</a>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-lg-4">
                <h5 class="h5 text-ango-50">Contacto</h5>
                <p>Endereço do escritorio geral da Angodoc</p>
                <p class="mb-0">Telefone: +244 997 36 56 87</p>
                <p>Email: geral@msa.ao</p>
            </div>
            @guest
                <div class="col-12 col-lg-4">
                    <h5 class="h5 text-ango-50">Administração</h5>
                    <p>Utilize os botões abaixo para entrar na área administrativa</p>
                    <a href="{{route('frontend.auth.login')}}" class="btn btn-outline-neutral mr-2">@lang('navs.frontend.login')</a>
                    @if(config('access.registration'))
                        <a href="{{route('frontend.auth.register')}}" class="btn btn-outline-neutral">@lang('navs.frontend.register')</a>
                    @endif
                </div>
            @endguest
        </div>
    </div>
    <hr>
    <div class="text-center">
        <p class="mb-0">
            &copy; {{ date('Y') }} <a href="{{route('frontend.index')}}" class="text-ango-50">AngoDoc</a> @lang('strings.backend.general.all_rights_reserved')
            <br/>
            @lang('labels.general.developed_by') <a href="https://www.msa.ao/" class="text-ango-50">MSA</a>
        </p>
    </div>
</footer>
