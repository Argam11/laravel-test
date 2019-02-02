<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use JWTFactory;
use JWTAuth;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ValidationUser;

class LoginController extends Controller
{
    public function login(ValidationUser $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('LaraPassport')->accessToken; 
            return response()->json([
              'status' => 'success',
              'data' => $success
            ]); 
          } else { 
            return response()->json([
              'status' => 'error',
              'data' => 'Unauthorized Access11'
            ]); 
          } 
    }
}
