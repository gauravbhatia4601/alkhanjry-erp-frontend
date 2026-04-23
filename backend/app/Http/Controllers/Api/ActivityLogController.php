<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ActivityLogController extends Controller
{
    public function index()
    {
        return $this->respondSuccess([]);
    }
}
