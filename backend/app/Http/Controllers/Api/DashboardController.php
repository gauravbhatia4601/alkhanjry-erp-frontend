<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        return $this->respondSuccess([
            'message' => 'Dashboard placeholder - implement KPI endpoints here',
        ]);
    }
}
