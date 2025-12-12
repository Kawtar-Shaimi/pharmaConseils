@extends('layouts.app')

@section('content')
<div class="container mx-auto px-5 py-16">
    <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-slate-900 mb-3">Contactez-nous</h2>
        <p class="text-slate-600">Une question ? Besoin d'un conseil ? N'hésitez pas à nous écrire.</p>
    </div>

    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <form action="{{ route('contact.send') }}" method="POST">
            @csrf
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Nom complet</label>
                <input type="text" name="name" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Email</label>
                <input type="email" name="email" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Sujet</label>
                <input type="text" name="subject" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
            </div>
            <div class="mb-5">
                <label class="block mb-2 font-medium text-slate-700">Message</label>
                <textarea name="message" rows="5" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required></textarea>
            </div>
            <button type="submit" class="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition">Envoyer le message</button>
        </form>
    </div>
</div>
@endsection
