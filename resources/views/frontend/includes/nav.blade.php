<nav class="navbar navbar-expand-lg navbar-light bg-white mb-4 fixed-top shadow-strong py-3">
    <div class="container">
        <a href="{{ route('frontend.index') }}" class="navbar-brand">
            <img src="{{ asset('img/logo.svg') }}"  width="40" height="40" alt="ANGODOC">
            <strong>{{ app_name() }}</strong>
        </a>

        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="@lang('labels.general.toggle_navigation')">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div class="navbar-collapse-header">
                <div class="row">
                  <div class="col-6 collapse-brand">
                    <a href="{{ route('frontend.index') }}" class="navbar-brand">
                        <img src="{{ asset('img/logo.svg') }}"  width="40" height="40" alt="ANGODOC">
                        <strong>{{ app_name() }}</strong>
                    </a>
                  </div>
                  <div class="col-6 collapse-close">
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item"><a href="{{route('frontend.index')}}" class="nav-link pl-2 pl-lg-3 {{ active_class(Route::is('frontend.index')) }}">@lang('navs.frontend.index')</a></li>
                <li class="nav-item"><a href="{{route('frontend.commonquestions')}}" class="nav-link pl-2 pl-lg-3 {{ active_class(Route::is('frontend.commonquestions')) }}">@lang('navs.frontend.questions')</a></li>
                <li class="nav-item"><a href="{{route('frontend.agencies')}}" class="nav-link pl-2 pl-lg-3 {{ active_class(Route::is('frontend.agencies')) }}">@lang('navs.frontend.agencies')</a></li>
                <li class="nav-item"><a href="{{route('frontend.contact')}}" class="nav-link pl-2 pl-lg-3 {{ active_class(Route::is('frontend.contact')) }}">@lang('navs.frontend.contact')</a></li>

                @guest
                @else
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link pl-2 pl-lg-3 dropdown-toggle" id="navbarDropdownMenuUser" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">{{ $logged_in_user->name }}</a>

                        <div class="dropdown-menu shadow-strong border-0" aria-labelledby="navbarDropdownMenuUser">
                            @can('view backend')
                                <a href="{{ route('frontend.admin.dashboard') }}" class="dropdown-item">@lang('navs.frontend.user.administration')</a>
                            @endcan

                            <a href="{{ route('frontend.auth.logout') }}" class="dropdown-item">@lang('navs.general.logout')</a>
                        </div>
                    </li>
                @endguest

                @if(config('locale.status') && count(config('locale.languages')) > 1)
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link pl-2 pl-lg-3 dropdown-toggle" id="navbarDropdownLanguageLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-globe-africa"></i> {{ strtoupper(app()->getLocale()) }}</a>

                        @include('includes.partials.lang')
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
