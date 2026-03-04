import { prisma } from '@/lib/prisma';
import PostForm from '@/components/PostForm';

export const dynamic = 'force-dynamic';

export default async function CreatePost() {
    let categories = [];
    try {
        categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    } catch (error) {
        console.error('DB error:', error.message);
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Nouvel Article</h1>
                <p className="text-slate-500 mt-1">Créez un nouvel article ou conseil santé</p>
            </div>
            <PostForm categories={categories} />
        </div>
    );
}
