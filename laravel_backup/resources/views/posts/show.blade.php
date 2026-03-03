@extends('layouts.app')

@section('content')
<div class="container mx-auto px-5 py-16">
    <div class="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-md">
        @if($post->image)
        <img src="{{ $post->image }}" alt="{{ $post->title }}" class="w-full h-auto rounded-xl mb-8 object-cover">
        @endif

        <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{{ $post->title }}</h1>
        <div class="flex items-center gap-4 text-slate-500 text-sm mb-8">
            <span>Par {{ $post->user->name ?? 'Admin' }}</span>
            <span>&bull;</span>
            <span>{{ $post->created_at->format('d M Y') }}</span>
            @if($post->category)
            <span>&bull;</span>
            <span class="text-teal-600 font-medium">{{ $post->category->name }}</span>
            @endif
        </div>

        <div class="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-10">
            {!! nl2br(e($post->content)) !!}
        </div>

        <hr class="border-slate-200 my-10">

        <h3 class="text-2xl font-bold text-slate-900 mb-6">Commentaires</h3>
        <div class="space-y-6 mb-8">
        <div class="space-y-6 mb-8">
            @forelse($post->comments->where('is_approved', true)->whereNull('parent_id') as $comment)
                <div class="space-y-4">
                    <!-- Parent Comment -->
                    <div class="p-4 rounded-lg {{ $comment->user->role === 'admin' ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50' }}">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <strong class="block font-semibold {{ $comment->user->role === 'admin' ? 'text-teal-700' : 'text-slate-900' }}">
                                    {{ $comment->user->name ?? 'Utilisateur' }}
                                    @if($comment->user->role === 'admin') 
                                        <span class="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full ml-2">Admin</span>
                                    @endif
                                </strong>
                            </div>
                            <span class="text-xs text-slate-400">{{ $comment->created_at->diffForHumans() }}</span>
                        </div>
                        <p class="text-slate-600 mb-3">{{ $comment->content }}</p>
                        
                        @auth
                        <button onclick="toggleReplyForm({{ $comment->id }})" class="text-sm text-teal-600 font-medium hover:underline flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                            Répondre
                        </button>
                        <!-- Reply Form -->
                        <div id="reply-form-{{ $comment->id }}" class="hidden mt-3 ml-4">
                            <form action="{{ route('articles.comment', $post->id) }}" method="POST">
                                @csrf
                                <input type="hidden" name="parent_id" value="{{ $comment->id }}">
                                <textarea name="content" rows="2" placeholder="Votre réponse..." class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 mb-2" required></textarea>
                                <button type="submit" class="text-xs bg-teal-500 text-white font-bold px-3 py-1.5 rounded hover:bg-teal-600 transition">Envoyer</button>
                            </form>
                        </div>
                        @endauth
                    </div>

                    <!-- Replies -->
                    @foreach($comment->replies->where('is_approved', true) as $reply)
                    <div class="ml-8 md:ml-12 p-4 rounded-lg {{ $reply->user->role === 'admin' ? 'bg-teal-50 border border-teal-200' : 'bg-slate-100' }}">
                         <div class="flex justify-between items-start mb-1">
                            <strong class="font-semibold text-sm {{ $reply->user->role === 'admin' ? 'text-teal-700' : 'text-slate-800' }}">
                                {{ $reply->user->name ?? 'Utilisateur' }}
                                @if($reply->user->role === 'admin') 
                                    <span class="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full ml-2">Admin</span>
                                @endif
                            </strong>
                            <span class="text-xs text-slate-400">{{ $reply->created_at->diffForHumans() }}</span>
                        </div>
                        <p class="text-slate-600 text-sm">{{ $reply->content }}</p>
                    </div>
                    @endforeach
                </div>
            @empty
                <p class="text-slate-500 italic">Aucun commentaire pour le moment. Soyez le premier !</p>
            @endforelse
        </div>

        <script>
            function toggleReplyForm(id) {
                var form = document.getElementById('reply-form-' + id);
                form.classList.toggle('hidden');
            }
        </script>

        @auth
        <form action="{{ route('articles.comment', $post->id) }}" method="POST">
            @csrf
            <textarea name="content" rows="3" placeholder="Votre commentaire..." class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4" required></textarea>
            <button type="submit" class="bg-teal-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-teal-600 transition">Poster le commentaire</button>
        </form>
        @else
        <div class="bg-teal-50 border border-teal-100 p-4 rounded-lg text-teal-800">
            <a href="{{ route('login') }}" class="font-bold underline">Connectez-vous</a> pour commenter cet article.
        </div>
        @endauth
    </div>
</div>
@endsection
