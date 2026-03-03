<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - PharmaConseils</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-100 font-sans antialiased text-slate-600">
    <div class="flex min-h-screen">
        <aside class="w-64 bg-slate-900 text-white flex-shrink-0">
            <div class="p-6">
                 <h2 class="text-2xl font-bold mb-8">PharmaAdmin</h2>
                 <nav class="space-y-2">
                    <a href="{{ route('admin.dashboard') }}" class="block px-4 py-3 rounded-lg hover:bg-slate-800 {{ request()->routeIs('admin.dashboard') ? 'bg-slate-800 text-white' : 'text-slate-400' }}">Dashboard</a>
                    <a href="{{ route('admin.posts.index') }}" class="block px-4 py-3 rounded-lg hover:bg-slate-800 {{ request()->routeIs('admin.posts.*') ? 'bg-slate-800 text-white' : 'text-slate-400' }}">Articles</a>
                    <a href="{{ route('admin.categories.index') }}" class="block px-4 py-3 rounded-lg hover:bg-slate-800 {{ request()->routeIs('admin.categories.*') ? 'bg-slate-800 text-white' : 'text-slate-400' }}">Catégories</a>
                    <a href="{{ route('admin.comments.index') }}" class="block px-4 py-3 rounded-lg hover:bg-slate-800 {{ request()->routeIs('admin.comments.*') ? 'bg-slate-800 text-white' : 'text-slate-400' }}">Commentaires</a>
                    <a href="/" target="_blank" class="block px-4 py-3 mt-8 text-teal-400 hover:text-teal-300">Retour au site</a>
                </nav>
            </div>
        </aside>

        <main class="flex-1 p-8 overflow-y-auto">
            <header class="bg-white p-6 rounded-xl shadow-sm mb-8 flex justify-between items-center">
                <h3 class="font-bold text-lg text-slate-800">Bonjour, {{ auth()->user()->name }}</h3>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition text-sm">Déconnexion</button>
                </form>
            </header>
            @yield('content')
        </main>
    </div>
</body>
</html>
