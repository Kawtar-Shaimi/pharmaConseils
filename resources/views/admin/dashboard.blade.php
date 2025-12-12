@extends('layouts.admin')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow-sm">
        <h4 class="text-slate-500 font-medium mb-2">Total Articles</h4>
        <p class="text-4xl font-bold text-slate-900">{{ \App\Models\Post::count() }}</p>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm">
        <h4 class="text-slate-500 font-medium mb-2">Commentaires en attente</h4>
        <p class="text-4xl font-bold text-teal-600">{{ \App\Models\Comment::where('is_approved', false)->count() }}</p>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm">
        <h4 class="text-slate-500 font-medium mb-2">Catégories</h4>
        <p class="text-4xl font-bold text-slate-900">{{ \App\Models\Category::count() }}</p>
    </div>
</div>

<div class="bg-white p-8 rounded-xl shadow-sm">
    <h3 class="text-xl font-bold text-slate-900 mb-6">Derniers articles publiés</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                    <th class="p-4 font-semibold">Titre</th>
                    <th class="p-4 font-semibold">Auteur</th>
                    <th class="p-4 font-semibold">Date</th>
                    <th class="p-4 font-semibold">Statut</th>
                </tr>
            </thead>
            <tbody class="text-slate-700">
                @foreach(\App\Models\Post::latest()->take(5)->get() as $post)
                <tr class="border-b border-slate-50 hover:bg-slate-50">
                    <td class="p-4 font-medium">{{ $post->title }}</td>
                    <td class="p-4">{{ $post->user->name ?? 'N/A' }}</td>
                    <td class="p-4">{{ $post->created_at->format('d/m/Y') }}</td>
                    <td class="p-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Publié
                        </span>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
