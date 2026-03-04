import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deletePost } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function AdminPosts() {
    let posts = [];
    try {
        posts = await prisma.post.findMany({
            orderBy: { created_at: 'desc' },
            include: { category: true, user: true },
        });
    } catch (error) {
        console.error('DB error:', error.message);
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Articles</h1>
                    <p className="text-slate-500 mt-1">{posts.length} article{posts.length > 1 ? 's' : ''}</p>
                </div>
                <Link href="/admin/posts/create" className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md shadow-teal-500/20">
                    + Nouvel article
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Titre</th>
                            <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Catégorie</th>
                            <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                            <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="text-right py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition">
                                <td className="py-4 px-5 font-medium text-slate-800 text-sm max-w-xs truncate">{post.title}</td>
                                <td className="py-4 px-5">
                                    <span className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg font-medium">{post.category?.name || '-'}</span>
                                </td>
                                <td className="py-4 px-5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${post.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                        {post.is_published ? 'Publié' : 'Brouillon'}
                                    </span>
                                </td>
                                <td className="py-4 px-5 text-sm text-slate-500">{new Date(post.created_at).toLocaleDateString('fr-FR')}</td>
                                <td className="py-4 px-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/posts/${post.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                                            Modifier
                                        </Link>
                                        <form action={async () => { 'use server'; await deletePost(post.id); }}>
                                            <button type="submit" className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer">
                                                Supprimer
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr><td colSpan="5" className="py-12 text-center text-slate-400">Aucun article. Créez votre premier article !</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
