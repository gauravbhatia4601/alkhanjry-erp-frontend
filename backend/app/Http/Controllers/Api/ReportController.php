<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function sales()
    {
        return $this->respondSuccess([]);
    }

    public function inventory()
    {
        return $this->respondSuccess([]);
    }

    public function financial()
    {
        return $this->respondSuccess([]);
    }

    public function accountsPayable()
    {
        return $this->respondSuccess([]);
    }
}
