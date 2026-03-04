import { prisma } from '@/lib/prisma';
import { approveComment, deleteComment } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function AdminComments() {
    let pendingComments = [];
    let approvedComments = [];
    try {
        pendingComments = await prisma.comment.findMany({
            where: { is_approved: false },
            orderBy: { created_at: 'desc' },
            include: { user: true, post: true },
        });
        approvedComments = await prisma.comment.findMany({
            where: { is_approved: true },
            orderBy: { created_at: 'desc' },
            take: 20,
            include: { user: true, post: true },
        });
    } catch (error) {
        console.error('DB error:', error.message);
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Commentaires</h1>
                <p className="text-slate-500 mt-1">{pendingComments.length} en attente de modération</p>
            </div>

            {/* Pending */}
            {pendingComments.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        En attente ({pendingComments.length})
                    </h3>
                    <div className="space-y-3">
                        {pendingComments.map(comment => (
                            <div key={comment.id} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-semibold text-slate-800 text-sm">{comment.user?.name || 'Anonyme'}</p>
                                        <p className="text-xs text-slate-400">sur "{comment.post?.title}" · {new Date(comment.created_at).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <form action={async () => { 'use server'; await approveComment(comment.id); }}>
                                            <button type="submit" className="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition cursor-pointer">
                                                ✓ Approuver
                                            </button>
                                        </form>
                                        <form action={async () => { 'use server'; await deleteComment(comment.id); }}>
                                            <button type="submit" className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer">
                                                ✕ Rejeter
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Approved */}
            <div>
                <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Approuvés ({approvedComments.length})
                </h3>
                <div className="space-y-3">
                    {approvedComments.map(comment => (
                        <div key={comment.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">{comment.user?.name || 'Anonyme'}</p>
                                    <p className="text-xs text-slate-400">sur "{comment.post?.title}" · {new Date(comment.created_at).toLocaleDateString('fr-FR')}</p>
                                </div>
                                <form action={async () => { 'use server'; await deleteComment(comment.id); }}>
                                    <button type="submit" className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer">Supprimer</button>
                                </form>
                            </div>
                            <p className="text-sm text-slate-600">{comment.content}</p>
                        </div>
                    ))}
                    {approvedComments.length === 0 && (
                        <p className="text-center text-slate-400 py-8">Aucun commentaire approuvé</p>
                    )}
                </div>
            </div>
        </div>
    );
}
