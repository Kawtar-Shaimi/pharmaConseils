'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscribeNewsletter } from '@/app/admin/actions';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        const result = await subscribeNewsletter(formData);
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setEmail('');
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    };

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 pt-20 pb-8 mt-auto">
            <div className="container mx-auto px-5">
                {/* Newsletter Banner */}
                <div className="relative -mt-32 mb-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-10 shadow-2xl shadow-teal-500/20 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Restez Informé</h3>
                        <p className="text-teal-100 mb-6 max-w-md mx-auto">Recevez nos derniers conseils santé directement dans votre boîte mail</p>
                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-5 py-3 rounded-xl text-slate-900 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-slate-400 text-sm"
                                placeholder="Votre adresse email"
                                required
                            />
                            <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg text-sm whitespace-nowrap cursor-pointer">
                                S'abonner
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-3 text-sm ${message.type === 'success' ? 'text-white' : 'text-red-200'}`}>{message.text}</p>
                        )}
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white p-2 rounded-xl text-xs font-bold">PC</span>
                            <span className="text-white text-lg font-bold">PharmaConseils</span>
                        </div>
                        <p className="text-sm leading-relaxed">Votre source de confiance pour tous vos conseils santé et bien-être.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contenus</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/posts" className="text-sm hover:text-teal-400 transition">Conseils santé</Link></li>
                            <li><Link href="/posts" className="text-sm hover:text-teal-400 transition">Articles</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-sm hover:text-teal-400 transition">Accueil</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-teal-400 transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>📞 05 22 45 67 89</li>
                            <li>✉️ contact@pharmaconseils.ma</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} PharmaConseils. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
