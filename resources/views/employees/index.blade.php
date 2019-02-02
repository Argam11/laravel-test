@extends('layout')

@section('content')
<style>
  .uper {
    margin-top: 40px;
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
    <a href="{{ route('employees.create') }}">
    <button type="button" class="btn btn-primary">Create employee</button>
    </a>
  </div>
  <br />
  <table class="table table-striped">
    <thead>
        <tr>
          <td>ID</td>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Company</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
    </thead>
    <tbody>
        @foreach($employees as $employee)
        <tr>
            <td>{{ $employee->id }}</td>
            <td>{{ $employee->first_name }}</td>
            <td>{{ $employee->last_name }}</td>
            <td>{{ $employee->companies->name }}</td>
            <td>{{ $employee->email }}</td>
            <td>{{ $employee->phone }}</td>
            <td><a href="{{ route('employees.edit', $employee->id)}}" class="btn btn-primary">Edit</a></td>
            <td>
                <form action="{{ route('employees.destroy', $employee->id)}}" method="post">
                  @csrf
                  @method('DELETE')
                  <button class="btn btn-danger" type="submit">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
        {{ $employees->links() }}
    </tbody>
  </table>
  
<div>
@endsection