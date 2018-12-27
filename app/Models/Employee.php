<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';
    protected $fillable = [
        'first_name',
        'last_name',
        'company_id',
        'email',
        'phone'
      ];
    public function companies()
    {
        return $this->hasOne('App\Models\Company', 'id', 'company_id');
    }
}
