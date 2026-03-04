import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPostForm from '@/components/EditPostForm';

export const dynamic = 'force-dynamic';

export default async function EditPost({ params }) {
    const { id } = await params;

    let post = null;
    let categories = [];
    try {
        post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
        categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    } catch (error) {
        console.error('DB error:', error.message);
    }

    if (!post) notFound();

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Modifier l'article</h1>
                <p className="text-slate-500 mt-1">{post.title}</p>
            </div>
            <EditPostForm post={post} categories={categories} />
        </div>
    );
}
