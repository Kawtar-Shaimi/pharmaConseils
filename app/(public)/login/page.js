'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError('Email ou mot de passe incorrect.');
        } else {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 px-4 py-12">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative animate-fade-in-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                        <span className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-3 rounded-2xl shadow-lg shadow-teal-500/25">PC</span>
                        <span className="gradient-text">PharmaConseils</span>
                    </Link>
                    <p className="text-slate-500 mt-3">Connectez-vous à votre espace</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-white/50">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-2 animate-slide-down">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Adresse email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-700 focus:ring-4 focus:ring-teal-400/30 transition-all duration-200 shadow-lg shadow-teal-500/25 disabled:opacity-70 disabled:cursor-not-allowed btn-glow"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Connexion...
                                </span>
                            ) : 'Se connecter'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm">
                            Pas encore de compte ?{' '}
                            <Link href="/register" className="text-teal-600 font-semibold hover:text-teal-700 transition">
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
