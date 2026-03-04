import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PostsIndex() {
    let posts = [];
    try {
        posts = await prisma.post.findMany({
            where: { is_published: true },
            orderBy: { created_at: 'desc' },
            include: { category: true }
        });
    } catch (error) {
        console.error('Database error:', error.message);
    }

    return (
        <div className="container mx-auto px-5 py-16">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Nos Conseils Santé</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                        <div className="h-48 overflow-hidden">
                            <img src={post.image || 'https://via.placeholder.com/300x200'} alt="Post" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            {post.category && <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">{post.category.name}</span>}
                            <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-3">{post.content.replace(/<[^>]+>/g, '').substring(0, 80)}...</p>
                            <Link href={`/posts/${post.slug}`} className="text-teal-500 font-semibold hover:underline">Lire la suite &rarr;</Link>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && (
                    <p className="text-slate-500 text-center col-span-full">Aucun conseil disponible pour le moment.</p>
                )}
            </div>
        </div>
    );
}
