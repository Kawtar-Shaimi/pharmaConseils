@extends('layouts.app')

@section('content')
<div class="min-h-[60vh] flex items-center justify-center py-16 px-5">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center text-slate-900 mb-6">Inscription</h2>
        
        <form action="{{ route('register') }}" method="POST">
            @csrf
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Nom complet</label>
                <input type="text" name="name" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Email</label>
                <input type="email" name="email" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
                @error('email') <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span> @enderror
            </div>
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Mot de passe</label>
                <input type="password" name="password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
             <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Confirmer le mot de passe</label>
                <input type="password" name="password_confirmation" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
            <button type="submit" class="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition">S'inscrire</button>
        </form>
         <p class="text-center mt-6 text-sm text-slate-600">
            Déjà un compte ? <a href="{{ route('login') }}" class="text-teal-600 font-bold hover:underline">Se connecter</a>
        </p>
    </div>
</div>
@endsection
