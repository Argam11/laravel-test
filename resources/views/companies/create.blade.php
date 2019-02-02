@extends('layout')

@section('content')
<style>
  .uper {
    margin-top: 40px;
  }
  input[type='file']{
    line-height: 1.2;
  }
</style>
<div class="card uper">
  <div class="card-header">
    Add company
  </div>
  <div class="card-body">
    @if ($errors->any())
      <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
        </ul>
      </div><br />
    @endif
    <div>
        <a href="{{ route('companies.index') }}">
        <button type="button" class="btn btn-primary">Back to companies page</button>
        </a>
    </div>
    <br />
      <form method="post" action="{{ route('companies.store') }}" enctype="multipart/form-data">
          @csrf
          <div class="form-group">
              <label for="name">Name: </label>
              <input type="text" class="form-control" name="name"/>
          </div>
          <div class="form-group">
              <label for="price">EMail: </label>
              <input type="text" class="form-control" name="email"/>
          </div>
          <div class="form-group">
              <label for="quantity">Logo: </label>
              <input type="file" class="form-control" name="logo"/>
          </div>
          <div class="form-group">
              <label for="quantity">Website: </label>
              <input type="text" class="form-control" name="website"/>
          </div>
          <button type="submit" class="btn btn-primary">Add</button>
      </form>
  </div>
</div>
@endsection