<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        return $this->respondSuccess([]);
    }

    public function store()
    {
        return $this->respondSuccess([]);
    }

    public function update($id)
    {
        return $this->respondSuccess([]);
    }

    public function destroy($id)
    {
        return $this->respondSuccess([]);
    }
}
