@extends('layouts.app')

@section('content')
<div class="container mx-auto px-5 py-16">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-10">Nos Conseils Santé</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @foreach($posts as $post)
        <div class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
             <div class="h-48 overflow-hidden">
                 <img src="{{ $post->image ?? 'https://via.placeholder.com/300x200' }}" alt="Post" class="w-full h-full object-cover">
             </div>
             <div class="p-6">
                 @if($post->category)<span class="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">{{ $post->category->name }}</span>@endif
                 <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{{ $post->title }}</h3>
                 <p class="text-slate-500 text-sm mb-4 line-clamp-3">{{ Str::limit(strip_tags($post->content), 80) }}</p>
                 <a href="{{ route('articles.show', $post->slug) }}" class="text-teal-500 font-semibold hover:underline">Lire la suite &rarr;</a>
             </div>
        </div>
        @endforeach
    </div>

    <div class="mt-10">
        {{ $posts->links() }}
    </div>
</div>
@endsection
