<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;

class HomeController extends Controller
{
    public function index()
    {
        $featured = Post::where('is_published', true)->whereNotNull('image')->latest()->take(3)->get();
        $latest = Post::where('is_published', true)->latest()->take(6)->get();
        $categories = Category::all();
        
        return view('home', compact('featured', 'latest', 'categories'));
    }
}
