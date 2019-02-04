<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidationEmployees extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'=>'required|max:255',
            'last_name' => 'required|max:255',
            'company_id' => 'required|integer|min:0|digits_between: 0,10',
            'email'=> 'required|email|max:255',
            'phone' => 'required|integer|min:0|digits_between: 0,10',
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Firstname is required!',
            'last_name.required' => 'Lastname is required!',
            'company_id.required' => 'company is required!',
            'email.required' => 'Email is required!',
            'phone.required' => 'Phone is required!'
        ];
    }
}
