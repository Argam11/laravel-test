@extends('layout')

@section('content')
<style>
  .uper {
    margin-top: 40px;
  }
</style>
<div class="card uper">
  <div class="card-header">
    Edit employee
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
        <a href="{{ route('employees.index') }}">
        <button type="button" class="btn btn-primary">Back to employees page</button>
        </a>
    </div>
    <br />
      <form method="post" action="{{ route('employees.update', $employee->id) }}">
        @method('PATCH')
        @csrf
        <div class="form-group">
          <label for="name">Firstname:</label>
          <input type="text" class="form-control" name="first_name" value={{ $employee->first_name }} />
        </div>
        <div class="form-group">
          <label for="price">Lastname:</label>
          <input type="text" class="form-control" name="last_name" value={{ $employee->last_name }} />
        </div>
        <div class="form-group">
          <label for="quantity">Company:</label>
          <select name="company_id" id="company_id" class="form-control">
            @foreach ($companies as $company)
              <option value="{{ $company->id }}" {{ ($company->id == $employee->company_id) ? 'selected' : '' }}>{{ $company->name }}</option>
            @endforeach
          </select>
        </div>
        <div class="form-group">
          <label for="quantity">EMail:</label>
          <input type="text" class="form-control" name="email" value={{ $employee->email }} />
        </div>
        <div class="form-group">
          <label for="quantity">Phone:</label>
          <input type="text" class="form-control" name="phone" value={{ $employee->phone }} />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
  </div>
</div>
@endsection