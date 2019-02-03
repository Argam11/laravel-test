<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::paginate(10);
        return response()->json($companies);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        return response()->json('Successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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
         return response()->json('Company duct Update Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Company::find($id);
        $employee->delete();
        return response()->json('Company duct Update Successfully.');
    }
}
