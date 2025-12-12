@extends('layouts.app')

@section('content')
<!-- Hero -->
<section class="bg-teal-500 py-20 text-white relative overflow-hidden">
    <div class="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1 z-10">
            <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-5">Conseils Santé Professionnels</h1>
            <p class="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">Découvrez nos conseils d'experts, vidéos éducatives et guides pratiques pour prendre soin de votre santé au quotidien.</p>
            <div class="flex gap-4">
                <a href="#" class="inline-block px-6 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-teal-600 transition">Voir les vidéos</a>
                <a href="{{ route('articles.index') }}" class="inline-block px-6 py-3 rounded-full font-bold border-2 border-teal-700 bg-teal-700 text-white hover:bg-teal-800 hover:border-teal-800 transition">Nos conseils</a>
            </div>
        </div>
        <div class="flex-1 w-full relative">
             <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Pharmacien" class="rounded-xl shadow-2xl relative z-10 w-full object-cover h-[400px]">
        </div>
    </div>
</section>

<!-- Featured -->
<section class="py-16">
    <div class="container mx-auto px-5">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-3">Contenus à la Une</h2>
            <p class="text-slate-600">Les derniers conseils et vidéos de nos pharmaciens experts</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 relative rounded-xl overflow-hidden h-96 group">
                <img src="https://images.unsplash.com/photo-1576091160550-217358c7db81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Featured" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <h3 class="text-white text-2xl font-bold mb-2">Comment bien prendre ses médicaments</h3>
                    <p class="text-slate-200">Conseils pratiques pour optimiser l'efficacité de vos traitements</p>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300">
                    <div class="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div> 
                    <div>
                        <h4 class="font-bold text-slate-800">Gérer la fièvre chez l'enfant</h4>
                        <p class="text-xs text-slate-500 mt-1">Guide complet pour parents</p>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300">
                     <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                     </div>
                    <div>
                        <h4 class="font-bold text-slate-800">Prévention cardiovasculaire</h4>
                        <p class="text-xs text-slate-500 mt-1">Conseils nutrition et exercice</p>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300">
                     <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                     </div>
                    <div>
                        <h4 class="font-bold text-slate-800">Phytothérapie moderne</h4>
                        <p class="text-xs text-slate-500 mt-1">Plantes médicinales efficaces</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Categories -->
<section class="py-16 bg-slate-100">
    <div class="container mx-auto px-5">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-slate-900">Explorez nos Catégories</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            @forelse($categories as $category)
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                <div class="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                    @switch($category->icon)
                        @case('video')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            @break
                        @case('book')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            @break
                        @case('pill')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            @break
                        @case('shield')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            @break
                        @case('apple')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            @break
                         @case('sun')
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            @break
                        @default
                             <span class="text-2xl font-bold">{{ substr($category->name, 0, 1) }}</span>
                    @endswitch
                </div>
                <h3 class="font-bold text-lg text-slate-900 mb-2">{{ $category->name }}</h3>
                <p class="text-slate-500 text-sm mb-4">Découvrez nos conseils {{ strtolower($category->name) }}.</p>
                <a href="#" class="text-teal-500 font-semibold text-sm hover:underline">{{ $category->posts()->where('is_published', true)->count() }} articles</a>
            </div>
            @empty
                <!-- Demo Categories -->
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                    <div class="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">Vidéos Conseils</h3>
                    <p class="text-slate-500 text-sm mb-4">Tutoriels vidéo et conseils pratiques.</p>
                    <a href="#" class="text-teal-500 font-semibold text-sm hover:underline">12 vidéos</a>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                    <div class="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">Guides Santé</h3>
                    <p class="text-slate-500 text-sm mb-4">Fiches pratiques et guides détaillés.</p>
                    <a href="#" class="text-teal-500 font-semibold text-sm hover:underline">28 guides</a>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                    <div class="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">Médicaments</h3>
                    <p class="text-slate-500 text-sm mb-4">Tout savoir sur vos traitements.</p>
                    <a href="#" class="text-teal-500 font-semibold text-sm hover:underline">46 articles</a>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                    <div class="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">Prévention</h3>
                    <p class="text-slate-500 text-sm mb-4">Conseils pour rester en bonne santé.</p>
                    <a href="#" class="text-teal-500 font-semibold text-sm hover:underline">31 conseils</a>
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Latest -->
<section class="py-16">
    <div class="container mx-auto px-5">
        <div class="flex justify-between items-end mb-8">
            <h2 class="text-3xl font-bold text-slate-900">Derniers Conseils</h2>
            <a href="{{ route('articles.index') }}" class="text-teal-500 font-semibold hover:underline">Voir tout</a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             @forelse($latest as $post)
             <div class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                 <div class="h-48 overflow-hidden">
                     <img src="{{ $post->image ?? 'https://via.placeholder.com/300x200' }}" alt="Post" class="w-full h-full object-cover">
                 </div>
                 <div class="p-6">
                     @if($post->category)<span class="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">{{ $post->category->name }}</span>@endif
                     <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{{ $post->title }}</h3>
                     <p class="text-slate-500 text-sm mb-4 line-clamp-3">{{ Str::limit(strip_tags($post->content), 80) }}</p>
                     <div class="flex items-center gap-3">
                         <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                         <span class="text-sm font-medium text-slate-700">{{ $post->user->name ?? 'Dr. Pharmacien' }}</span>
                     </div>
                 </div>
             </div>
             @empty
                <!-- Demo Content -->
                <!-- Same demo content structure as above but translated to Tailwind -->
                <div class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                     <div class="h-48 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Post" class="w-full h-full object-cover">
                     </div>
                     <div class="p-6">
                         <span class="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">Nutrition</span>
                         <h3 class="text-xl font-bold text-slate-900 mb-2">Les vitamines essentielles en hiver</h3>
                         <p class="text-slate-500 text-sm mb-4">Découvrez quelles vitamines privilégier pour renforcer votre immunité.</p>
                         <div class="flex items-center gap-3">
                             <img src="https://i.pravatar.cc/150?img=32" class="w-8 h-8 rounded-full object-cover">
                             <span class="text-sm font-medium text-slate-700">Dr. Marie Dubois</span>
                         </div>
                     </div>
                 </div>
                 <div class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                     <div class="h-48 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Post" class="w-full h-full object-cover">
                     </div>
                     <div class="p-6">
                         <span class="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3">Médicaments</span>
                         <h3 class="text-xl font-bold text-slate-900 mb-2">Bien gérer sa médication</h3>
                         <p class="text-slate-500 text-sm mb-4">Conseils pratiques pour ne jamais oublier ses médicaments et optimiser...</p>
                          <div class="flex items-center gap-3">
                             <img src="https://i.pravatar.cc/150?img=68" class="w-8 h-8 rounded-full object-cover">
                             <span class="text-sm font-medium text-slate-700">Dr. Pierre Martin</span>
                         </div>
                     </div>
                 </div>
                 <div class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                     <div class="h-48 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Post" class="w-full h-full object-cover">
                     </div>
                     <div class="p-6">
                         <span class="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">Naturel</span>
                         <h3 class="text-xl font-bold text-slate-900 mb-2">Remèdes naturels efficaces</h3>
                         <p class="text-slate-500 text-sm mb-4">Explorez les solutions naturelles validées scientifiquement pour les maux.</p>
                          <div class="flex items-center gap-3">
                             <img src="https://i.pravatar.cc/150?img=5" class="w-8 h-8 rounded-full object-cover">
                             <span class="text-sm font-medium text-slate-700">Dr. Sophie Laurent</span>
                         </div>
                     </div>
                 </div>
             @endforelse
        </div>
    </div>
</section>

<!-- Newsletter -->
<section class="bg-teal-500 text-white py-20 text-center">
    <div class="container mx-auto px-5">
        <h2 class="text-3xl font-bold mb-4">Restez Informé</h2>
        <p class="opacity-90 mb-8 max-w-xl mx-auto">Recevez nos derniers conseils santé directement dans votre boîte mail</p>
        <form action="{{ route('subscribe') }}" method="POST" class="max-w-md mx-auto flex gap-3">
            @csrf
            <input type="email" name="email" class="flex-1 px-6 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-300" placeholder="Votre adresse email" required>
            <button type="submit" class="px-8 py-3 bg-white text-teal-600 font-bold rounded-full hover:bg-slate-100 transition">S'abonner</button>
        </form>
    </div>
</section>
@endsection
