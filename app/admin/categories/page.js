import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
    let categories = [];
    try {
        categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { posts: true } } },
        });
    } catch (error) {
        console.error('DB error:', error.message);
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Catégories</h1>
                <p className="text-slate-500 mt-1">{categories.length} catégorie{categories.length > 1 ? 's' : ''}</p>
            </div>

            {/* Create Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Nouvelle catégorie</h3>
                <form action={createCategory} className="flex gap-3">
                    <input name="name" type="text" required placeholder="Nom de la catégorie" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm" />
                    <input name="icon" type="text" placeholder="Icône (emoji)" className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm text-center" />
                    <button type="submit" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md shadow-teal-500/20 text-sm whitespace-nowrap cursor-pointer">
                        + Ajouter
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                    <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">{cat.icon || '📁'}</span>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">{cat.name}</p>
                                <p className="text-xs text-slate-400">{cat._count.posts} article{cat._count.posts > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <form action={async () => { 'use server'; await deleteCategory(cat.id); }}>
                            <button type="submit" className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer">
                                Supprimer
                            </button>
                        </form>
                    </div>
                ))}
                {categories.length === 0 && (
                    <p className="col-span-full text-center text-slate-400 py-8">Aucune catégorie. Créez-en une ci-dessus !</p>
                )}
            </div>
        </div>
    );
}
