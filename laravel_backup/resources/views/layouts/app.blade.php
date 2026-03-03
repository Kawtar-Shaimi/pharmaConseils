<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PharmaConseils - Votre santé, nos conseils</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-50 text-slate-700 font-sans antialiased">
    <header class="bg-white shadow-sm py-5">
        <div class="container mx-auto px-5 flex justify-between items-center">
            <a href="/" class="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
                <span class="bg-teal-500 text-white p-2 rounded-lg">PC</span> PharmaConseils
            </a>
            <nav class="flex gap-7">
                <a href="{{ route('home') }}" class="font-medium text-slate-700 hover:text-teal-500 transition">Accueil</a>
                <a href="{{ route('articles.index') }}" class="font-medium text-slate-700 hover:text-teal-500 transition">Conseils</a>
                <a href="#" class="font-medium text-slate-700 hover:text-teal-500 transition">Vidéos</a>
                <a href="{{ route('contact.index') }}" class="font-medium text-slate-700 hover:text-teal-500 transition">Contact</a>
                @guest
                    <a href="{{ route('login') }}" class="font-medium text-slate-700 hover:text-teal-500 transition">Connexion</a>
                @else
                    @if(auth()->user()->role === 'admin')
                        <a href="{{ route('admin.dashboard') }}" class="font-medium text-slate-700 hover:text-teal-500 transition">Dashboard</a>
                    @endif
                    <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="font-medium text-slate-700 hover:text-teal-500 transition">Déconnexion</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form>
                @endguest
            </nav>
        </div>
    </header>

    <main>
        @if(session('success'))
            <div class="container mx-auto px-5 mt-8">
                <div class="bg-emerald-100 text-emerald-800 p-4 rounded-lg">
                    {{ session('success') }}
                </div>
            </div>
        @endif
        
        @yield('content')
    </main>

    <footer class="bg-slate-900 text-slate-400 py-16 mt-auto">
        <div class="container mx-auto px-5">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
                <div class="col-span-2">
                    <span class="text-white text-2xl font-bold mb-5 block">PharmaConseils</span>
                    <p>Votre source de confiance pour tous vos conseils santé et bien-être.</p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-5">Contenus</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white">Vidéos conseils</a></li>
                        <li><a href="#" class="hover:text-white">Guides santé</a></li>
                        <li><a href="#" class="hover:text-white">Articles</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-5">Catégories</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white">Médicaments</a></li>
                        <li><a href="#" class="hover:text-white">Prévention</a></li>
                        <li><a href="#" class="hover:text-white">Nutrition</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-5">Contact</h4>
                    <ul class="space-y-2">
                        <li>05 22 45 67 89</li>
                        <li>contact@pharmaconseils.ma</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-700 pt-5 text-center text-sm">
                &copy; 2024 PharmaConseils. Tous droits réservés.
            </div>
        </div>
    </footer>
</body>
</html>
