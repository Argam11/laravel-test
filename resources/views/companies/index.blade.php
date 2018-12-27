@extends('layout')

@section('content')
<style>
  .uper {
    margin-top: 40px;
  }
  img{
      width: 100px;
  }
</style>
<div class="uper">
  @if(session()->get('success'))
    <div class="alert alert-success">
      {{ session()->get('success') }}
    </div><br />
  @endif
  <div>
    <a href="{{ route('home') }}">
    <button type="button" class="btn btn-primary">Home</button>
    </a>
  </div>
  <br />
  <div>
    <a href="{{ route('companies.create') }}">
    <button type="button" class="btn btn-primary">Create company</button>
    </a>
  </div>
  <br />
  <table class="table table-striped">
    <thead>
        <tr>
          <td>ID</td>
          <td>Company name</td>
          <td>Company email</td>
          <td>Company logo</td>
          <td>Company website</td>
        </tr>
    </thead>
    <tbody>
        @foreach($companies as $company)
        <tr>
            <td>{{$company->id}}</td>
            <td>{{$company->name}}</td>
            <td>{{$company->email}}</td>
            <td><img src="{{ asset('/storage/'.$company->logo) }}" alt="logo"></td>
            <td>{{$company->website}}</td>
            <td><a href="{{ route('companies.edit',$company->id)}}" class="btn btn-primary">Edit</a></td>
            <td>
                <form action="{{ route('companies.destroy', $company->id)}}" method="post">
                  @csrf
                  @method('DELETE')
                  <button class="btn btn-danger" type="submit">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
        {{ $companies->links() }}
    </tbody>
  </table>
<div>
@endsection