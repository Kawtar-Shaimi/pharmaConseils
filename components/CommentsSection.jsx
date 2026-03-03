'use client';
import { useState } from 'react';
import { submitComment } from '@/app/posts/[slug]/actions';

export default function CommentsSection({ post, comments }) {
    const [replyingTo, setReplyingTo] = useState(null);

    return (
        <div>
            <div className="space-y-6 mb-8">
                {comments.length > 0 ? comments.map(comment => (
                    <div key={comment.id} className="space-y-4">
                        <div className={`p-4 rounded-lg ${comment.user?.role === 'admin' ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <strong className={`block font-semibold ${comment.user?.role === 'admin' ? 'text-teal-700' : 'text-slate-900'}`}>
                                        {comment.user?.name || 'Utilisateur'}
                                        {comment.user?.role === 'admin' && (
                                            <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full ml-2">Admin</span>
                                        )}
                                    </strong>
                                </div>
                                <span className="text-xs text-slate-400">
                                    {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                                </span>
                            </div>
                            <p className="text-slate-600 mb-3">{comment.content}</p>

                            <button
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                className="text-sm text-teal-600 font-medium hover:underline flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                                Répondre
                            </button>

                            {replyingTo === comment.id && (
                                <div className="mt-3 ml-4">
                                    <form action={submitComment}>
                                        <input type="hidden" name="post_id" value={post.id} />
                                        <input type="hidden" name="parent_id" value={comment.id} />
                                        <textarea name="content" rows="2" placeholder="Votre réponse..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 mb-2" required></textarea>
                                        <button type="submit" className="text-xs bg-teal-500 text-white font-bold px-3 py-1.5 rounded hover:bg-teal-600 transition">Envoyer</button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.map(reply => (
                            <div key={reply.id} className={`ml-8 md:ml-12 p-4 rounded-lg ${reply.user?.role === 'admin' ? 'bg-teal-50 border border-teal-200' : 'bg-slate-100'}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <strong className={`font-semibold text-sm ${reply.user?.role === 'admin' ? 'text-teal-700' : 'text-slate-800'}`}>
                                        {reply.user?.name || 'Utilisateur'}
                                        {reply.user?.role === 'admin' && (
                                            <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full ml-2">Admin</span>
                                        )}
                                    </strong>
                                    <span className="text-xs text-slate-400">
                                        {new Date(reply.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">{reply.content}</p>
                            </div>
                        ))}
                    </div>
                )) : (
                    <p className="text-slate-500 italic">Aucun commentaire pour le moment. Soyez le premier !</p>
                )}
            </div>

            {/* Main Comment Form */}
            <form action={submitComment}>
                <input type="hidden" name="post_id" value={post.id} />
                <textarea name="content" rows="3" placeholder="Votre commentaire..." className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4" required></textarea>
                <button type="submit" className="bg-teal-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-teal-600 transition">Poster le commentaire</button>
            </form>
            <div className="mt-2 text-sm text-slate-500">Note: Dans cette version migrée, le commentaire sera posté de façon anonyme ou par l'User #1 jusqu'à ce que l'authentification soit complètement rétablie.</div>
        </div>
    );
}
