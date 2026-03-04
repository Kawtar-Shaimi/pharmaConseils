import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';


export default async function AdminDashboard() {
    const postsCount = await prisma.post.count();
    const pendingCommentsCount = await prisma.comment.count({
        where: { is_approved: false }
    });
    const categoriesCount = await prisma.category.count();

    const latestPosts = await prisma.post.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
            user: true
        }
    });

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Tableau de Bord Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-slate-500 font-medium mb-2">Total Articles</h4>
                    <p className="text-4xl font-bold text-slate-900">{postsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-slate-500 font-medium mb-2">Commentaires en attente</h4>
                    <p className="text-4xl font-bold text-teal-600">{pendingCommentsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-slate-500 font-medium mb-2">Catégories</h4>
                    <p className="text-4xl font-bold text-slate-900">{categoriesCount}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Derniers articles publiés</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">Titre</th>
                                <th className="p-4 font-semibold">Auteur</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            {latestPosts.map(post => (
                                <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-4 font-medium">{post.title}</td>
                                    <td className="p-4">{post.user?.name || 'N/A'}</td>
                                    <td className="p-4">{new Date(post.created_at).toLocaleDateString('fr-FR')}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                            {post.is_published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {latestPosts.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-slate-500 text-sm">Aucun article trouvé.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
