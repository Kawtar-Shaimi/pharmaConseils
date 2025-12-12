<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Subscriber;

class ContactController extends Controller
{
    public function index()
    {
        return view('contact');
    }

    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required'
        ]);

        Message::create($request->all());

        return back()->with('success', 'Message envoyé avec succès !');
    }

    public function subscribe(Request $request)
    {
        $request->validate(['email' => 'required|email|unique:subscribers']);
        
        Subscriber::create(['email' => $request->email]);

        return back()->with('success', 'Inscription à la newsletter réussie !');
    }
}
