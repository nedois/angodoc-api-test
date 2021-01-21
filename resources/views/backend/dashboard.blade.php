@extends('backend.layouts.react')

@section('content')
    <div id="app" data-user="{{ $user }}" data-role="{{ $role }}" data-agency="{{ $agency }}"></div>
@endsection
