<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function store()
    {
        return $this->respondSuccess([]);
    }

    public function destroy($id)
    {
        return $this->respondSuccess([]);
    }
}
