@extends('layouts.admin')

@section('content')
<div class="bg-white p-8 rounded-xl shadow-sm">
    <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-slate-900">Gestion des Articles</h3>
        <a href="#" class="px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition text-sm">+ Nouvel Article</a>
    </div>
    
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                    <th class="p-4 font-semibold">Titre</th>
                    <th class="p-4 font-semibold">Catégorie</th>
                    <th class="p-4 font-semibold">Date</th>
                    <th class="p-4 font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="text-slate-700">
                @foreach($posts as $post)
                <tr class="border-b border-slate-50 hover:bg-slate-50">
                    <td class="p-4 font-medium">{{ $post->title }}</td>
                    <td class="p-4">{{ $post->category->name ?? '-' }}</td>
                    <td class="p-4">{{ $post->created_at->format('d/m/Y') }}</td>
                    <td class="p-4 flex gap-3">
                        <a href="#" class="text-blue-600 hover:underline font-medium">Editer</a>
                        <a href="#" class="text-red-600 hover:underline font-medium">Supprimer</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    
    <div class="mt-6">
        {{ $posts->links() }}
    </div>
</div>
@endsection
