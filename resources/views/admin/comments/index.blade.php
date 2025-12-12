@extends('layouts.admin')

@section('content')
<div class="bg-white p-8 rounded-xl shadow-sm">
    <div class="mb-6">
        <h3 class="text-xl font-bold text-slate-900">Modération des Commentaires</h3>
    </div>
    
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                    <th class="p-4 font-semibold">Auteur</th>
                    <th class="p-4 font-semibold">Message</th>
                    <th class="p-4 font-semibold">Article</th>
                    <th class="p-4 font-semibold">Date</th>
                    <th class="p-4 font-semibold">Statut</th>
                    <th class="p-4 font-semibold w-1/6">Actions</th>
                </tr>
            </thead>
            <tbody class="text-slate-700">
                @forelse($comments as $comment)
                <tr class="border-b border-slate-50 hover:bg-slate-50">
                    <td class="p-4 font-medium">{{ $comment->user->name ?? 'Inconnu' }}</td>
                    <td class="p-4 text-sm max-w-xs truncate" title="{{ $comment->content }}">{{ $comment->content }}</td>
                    <td class="p-4 text-sm text-teal-600">{{ Str::limit($comment->post->title ?? 'Article supprimé', 20) }}</td>
                    <td class="p-4 text-sm">{{ $comment->created_at->format('d/m/Y H:i') }}</td>
                    <td class="p-4">
                        @if($comment->is_approved)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Approuvé
                            </span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                En attente
                            </span>
                        @endif
                    </td>
                    <td class="p-4 flex gap-2">
                        @if(!$comment->is_approved)
                        <form action="{{ route('admin.comments.approve', $comment->id) }}" method="POST" class="inline">
                            @csrf
                            <button type="submit" class="text-green-600 hover:text-green-900 font-medium text-sm">Approuver</button>
                        </form>
                        @endif
                        <form action="{{ route('admin.comments.destroy', $comment->id) }}" method="POST" class="inline" onsubmit="return confirm('Voulez-vous vraiment supprimer ce commentaire ?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-900 font-medium text-sm">Supprimer</button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="p-8 text-center text-slate-500 italic">Aucun commentaire à modérer.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    
    <div class="mt-6">
        {{ $comments->links() }}
    </div>
</div>
@endsection
