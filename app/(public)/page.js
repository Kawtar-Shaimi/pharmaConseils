import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Home() {
    let categories = [];
    let latest = [];

    try {
        categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { posts: { where: { is_published: true } } }
                }
            }
        });

        latest = await prisma.post.findMany({
            where: { is_published: true },
            take: 3,
            orderBy: { created_at: 'desc' },
            include: {
                category: true,
                user: true
            }
        });
    } catch (error) {
        console.error('Database error:', error.message);
    }

    return (
        <>
            {/* Hero */}
            <section className="bg-teal-500 py-20 text-white relative overflow-hidden">
                <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 z-10">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5">Conseils Santé Professionnels</h1>
                        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">Découvrez nos conseils d'experts, vidéos éducatives et guides pratiques pour prendre soin de votre santé au quotidien.</p>
                        <div className="flex gap-4">
                            <Link href="#" className="inline-block px-6 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-teal-600 transition">Voir les vidéos</Link>
                            <Link href="/posts" className="inline-block px-6 py-3 rounded-full font-bold border-2 border-teal-700 bg-teal-700 text-white hover:bg-teal-800 hover:border-teal-800 transition">Nos conseils</Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Pharmacien" className="rounded-xl shadow-2xl relative z-10 w-full object-cover h-[400px]" />
                    </div>
                </div>
            </section>

            {/* Featured */}
            <section className="py-16">
                <div className="container mx-auto px-5">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Contenus à la Une</h2>
                        <p className="text-slate-600">Les derniers conseils et vidéos de nos pharmaciens experts</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 relative rounded-xl overflow-hidden h-96 group">
                            <img src="https://images.unsplash.com/photo-1576091160550-217358c7db81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Featured" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-2xl font-bold mb-2">Comment bien prendre ses médicaments</h3>
                                <p className="text-slate-200">Conseils pratiques pour optimiser l'efficacité de vos traitements</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300 cursor-pointer">
                                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Gérer la fièvre chez l'enfant</h4>
                                    <p className="text-xs text-slate-500 mt-1">Guide complet pour parents</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300 cursor-pointer">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Prévention cardiovasculaire</h4>
                                    <p className="text-xs text-slate-500 mt-1">Conseils nutrition et exercice</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:-translate-y-1 transition duration-300 cursor-pointer">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Phytothérapie moderne</h4>
                                    <p className="text-xs text-slate-500 mt-1">Plantes médicinales efficaces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-slate-100">
                <div className="container mx-auto px-5">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Explorez nos Catégories</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categories.length > 0 ? categories.map((category) => (
                            <div key={category.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                                <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                                    {/* Simplification for icons, we can add a helper later */}
                                    <span className="text-2xl font-bold">{category.name.substring(0, 1)}</span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{category.name}</h3>
                                <p className="text-slate-500 text-sm mb-4">Découvrez nos conseils {category.name.toLowerCase()}.</p>
                                <Link href={`/category/${category.slug}`} className="text-teal-500 font-semibold text-sm hover:underline">
                                    {category._count.posts} articles
                                </Link>
                            </div>
                        )) : (
                            // Demo Categories fallback
                            <>
                                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                                    <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Vidéos Conseils</h3>
                                    <p className="text-slate-500 text-sm mb-4">Tutoriels vidéo et conseils pratiques.</p>
                                    <span className="text-teal-500 font-semibold text-sm hover:underline">12 vidéos</span>
                                </div>
                                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
                                    <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Guides Santé</h3>
                                    <p className="text-slate-500 text-sm mb-4">Fiches pratiques et guides détaillés.</p>
                                    <span className="text-teal-500 font-semibold text-sm hover:underline">28 guides</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest */}
            <section className="py-16">
                <div className="container mx-auto px-5">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Derniers Conseils</h2>
                        <Link href="/posts" className="text-teal-500 font-semibold hover:underline">Voir tout</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latest.length > 0 ? latest.map((post) => (
                            <Link href={`/posts/${post.slug}`} key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300 block">
                                <div className="h-48 overflow-hidden">
                                    <img src={post.image || 'https://via.placeholder.com/300x200'} alt="Post" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    {post.category && <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">{post.category.name}</span>}
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-3">{post.content.replace(/<[^>]+>/g, '').substring(0, 80)}...</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                        <span className="text-sm font-medium text-slate-700">{post.user?.name || 'Dr. Pharmacien'}</span>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            // Demo Content fallback
                            <>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                                    <div className="h-48 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Post" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">Nutrition</span>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Les vitamines essentielles en hiver</h3>
                                        <p className="text-slate-500 text-sm mb-4">Découvrez quelles vitamines privilégier pour renforcer votre immunité.</p>
                                        <div className="flex items-center gap-3">
                                            <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                                            <span className="text-sm font-medium text-slate-700">Dr. Marie Dubois</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-teal-500 text-white py-20 text-center">
                <div className="container mx-auto px-5">
                    <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
                    <p className="opacity-90 mb-8 max-w-xl mx-auto">Recevez nos derniers conseils santé directement dans votre boîte mail</p>
                    <form action="/api/subscribe" method="POST" className="max-w-md mx-auto flex gap-3">
                        <input type="email" name="email" className="flex-1 px-6 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-300" placeholder="Votre adresse email" required />
                        <button type="submit" className="px-8 py-3 bg-white text-teal-600 font-bold rounded-full hover:bg-slate-100 transition">S'abonner</button>
                    </form>
                </div>
            </section>
        </>
    );
}
