<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;

class ArticleController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)->latest()->paginate(9);
        return view('posts.index', compact('posts'));
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return view('posts.show', compact('post'));
    }

    public function comment(Request $request, $id)
    {
        $request->validate(['content' => 'required']);

        Comment::create([
            'post_id' => $id,
            'user_id' => auth()->id(),
            'parent_id' => $request->parent_id,
            'content' => $request->content,
            'is_approved' => true // Visible immediately
        ]);

        return back()->with('success', 'Votre commentaire a été publié.');
    }
}
