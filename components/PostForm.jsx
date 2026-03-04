'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/admin/actions';

export default function PostForm({ categories }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.target);
        const result = await createPost(formData);

        setLoading(false);
        if (result.success) {
            router.push('/admin/posts');
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
            {message && (
                <div className={`p-4 rounded-xl text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Titre de l'article</label>
                    <input name="title" type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm" placeholder="Le titre de votre article" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Catégorie</label>
                    <select name="category_id" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm">
                        <option value="">Sélectionner...</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                    <select name="type" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm">
                        <option value="text">Article texte</option>
                        <option value="video">Vidéo</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                    <input name="image" type="url" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm" placeholder="https://..." />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Vidéo URL</label>
                    <input name="video_url" type="url" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm" placeholder="https://youtube.com/..." />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contenu</label>
                    <textarea name="content" rows="10" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all text-sm resize-y" placeholder="Écrivez votre article ici..."></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input name="is_published" type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-teal-500 focus:ring-teal-400 cursor-pointer" />
                        <span className="text-sm font-medium text-slate-700">Publier immédiatement</span>
                    </label>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button type="submit" disabled={loading} className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md shadow-teal-500/20 disabled:opacity-70 text-sm">
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button type="button" onClick={() => router.back()} className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                    Annuler
                </button>
            </div>
        </form>
    );
}
