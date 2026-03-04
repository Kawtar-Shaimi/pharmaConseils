import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let postsCount = 0;
    let pendingCommentsCount = 0;
    let categoriesCount = 0;
    let latestPosts = [];

    try {
        postsCount = await prisma.post.count();
        pendingCommentsCount = await prisma.comment.count({ where: { is_approved: false } });
        categoriesCount = await prisma.category.count();
        latestPosts = await prisma.post.findMany({
            take: 5,
            orderBy: { created_at: 'desc' },
            include: { user: true, category: true },
        });
    } catch (error) {
        console.error('Dashboard DB error:', error.message);
    }

    const stats = [
        { label: 'Articles', value: postsCount, icon: '📝', color: 'from-blue-500 to-indigo-600', href: '/admin/posts' },
        { label: 'Commentaires en attente', value: pendingCommentsCount, icon: '💬', color: 'from-amber-500 to-orange-600', href: '/admin/comments' },
        { label: 'Catégories', value: categoriesCount, icon: '📂', color: 'from-teal-500 to-cyan-600', href: '/admin/categories' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Tableau de Bord</h1>
                <p className="text-slate-500 mt-1">Vue d'ensemble de votre site</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href} className="group">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>{stat.icon}</span>
                                <span className="text-xs text-teal-600 font-medium group-hover:underline">Voir →</span>
                            </div>
                            <p className="text-4xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Derniers articles</h3>
                    <Link href="/admin/posts/create" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md shadow-teal-500/20">
                        + Nouvel article
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Titre</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Catégorie</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestPosts.map(post => (
                                <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                                    <td className="py-3 px-4 font-medium text-slate-800 text-sm">{post.title}</td>
                                    <td className="py-3 px-4">
                                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-lg font-medium">{post.category?.name || '-'}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${post.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                            {post.is_published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-slate-500">{new Date(post.created_at).toLocaleDateString('fr-FR')}</td>
                                </tr>
                            ))}
                            {latestPosts.length === 0 && (
                                <tr><td colSpan="4" className="py-8 text-center text-slate-400 text-sm">Aucun article trouvé</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
