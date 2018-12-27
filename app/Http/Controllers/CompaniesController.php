<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Employee;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ValidationCompanies;

class CompaniesController extends Controller
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
        $companies = Company::paginate(10);
        return view('companies.index', compact('companies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('companies.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValidationCompanies $request)
    {
        if ($logo = $request->file('logo')) {
            $name = $logo->getClientoriginalName();
            $logo->storeAs('public', $name);
        }
        $companies = new Company([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'logo' => $request->file('logo')->getClientoriginalName(),
            'website' => $request->get('website')
        ]);
        $companies->save();
        return redirect('/companies')->with('success', 'Stock has been added');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::find($id);
        return view('companies.edit', compact('company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ValidationCompanies $request, $id)
    {
        $company = Company::find($id);
        $company->name = $request->get('name');
        $company->email = $request->get('email');
        $company->website = $request->get('website');
        if ($logo = $request->file('logo')) {
            $name = $logo->getClientoriginalName();
            $logo->storeAs('public', $name);
            $company->logo = $request->file('logo')->getClientoriginalName();
        }
        $company->save();
        return redirect('/companies')->with('success', 'Stock has been updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        $company->delete();
        return redirect('/companies')->with('success', 'Stock has been deleted Successfully');
    }
}
