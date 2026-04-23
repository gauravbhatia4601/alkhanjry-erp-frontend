<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class StockMovementController extends Controller
{
    public function index()
    {
        return $this->respondSuccess([]);
    }

    public function store()
    {
        return $this->respondSuccess([]);
    }
}
