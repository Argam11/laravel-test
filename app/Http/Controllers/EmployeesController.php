<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Employee;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ValidationEmployees;

class EmployeesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::with('companies')->paginate(10);
        return view('employees.index', compact('employees'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $companies = Company::all();
        return view('employees.create', compact('companies'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValidationEmployees $request)
    {
          $employees = new Employee([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'company_id' => $request->get('company_id'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone')
          ]);
          $employees->save();
          return redirect('/employees')->with('success', 'Stock has been added');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {   
        $companies = Company::all();
        $employee = Employee::find($id);
        return view('employees.edit', compact('employee', 'companies'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ValidationEmployees $request, $id)
    {
        $employee = Employee::find($id);
        $employee->first_name = $request->get('first_name');
        $employee->last_name = $request->get('last_name');
        $employee->company_id = $request->get('company_id');
        $employee->email = $request->get('email');
        $employee->phone = $request->get('phone');
        $employee->save();
        return redirect('/employees')->with('success', 'Stock has been updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();
        return redirect('/employees')->with('success', 'Stock has been deleted Successfully');
    }
}
