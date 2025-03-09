<?php

namespace App\Http\Controllers;

use App\Models\SendingHistory;
use App\Http\Requests\StoreSendingHistoryRequest;
use App\Http\Requests\UpdateSendingHistoryRequest;

class SendingHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSendingHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SendingHistory $sendingHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SendingHistory $sendingHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSendingHistoryRequest $request, SendingHistory $sendingHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SendingHistory $sendingHistory)
    {
        //
    }
}
