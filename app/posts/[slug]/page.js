import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CommentsSection from '@/components/CommentsSection';

export default async function PostShow({ params }) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            user: true,
            category: true,
            comments: {
                where: { is_approved: true, parent_id: null },
                include: {
                    user: true,
                    replies: {
                        where: { is_approved: true },
                        include: { user: true }
                    }
                },
                orderBy: { created_at: 'desc' }
            }
        }
    });

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <div className="container mx-auto px-5 py-16">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-md">
                {post.image && (
                    <img src={post.image} alt={post.title} className="w-full h-auto rounded-xl mb-8 object-cover" />
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-8">
                    <span>Par {post.user?.name || 'Admin'}</span>
                    <span>&bull;</span>
                    <span>{formattedDate}</span>
                    {post.category && (
                        <>
                            <span>&bull;</span>
                            <span className="text-teal-600 font-medium">{post.category.name}</span>
                        </>
                    )}
                </div>

                <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}>
                </div>

                <hr className="border-slate-200 my-10" />

                <h3 className="text-2xl font-bold text-slate-900 mb-6">Commentaires</h3>

                <CommentsSection post={post} comments={post.comments} />
            </div>
        </div>
    );
}
