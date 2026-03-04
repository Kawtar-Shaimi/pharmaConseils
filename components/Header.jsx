import Link from 'next/link';
import { auth } from '@/lib/auth';
import SignOutButton from '@/components/SignOutButton';

export default async function Header() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 glass shadow-sm">
            <div className="container mx-auto px-5 flex justify-between items-center h-16">
                <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold text-slate-900 group">
                    <span className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-2 rounded-xl shadow-md shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-300 text-sm">PC</span>
                    <span className="gradient-text">PharmaConseils</span>
                </Link>
                <nav className="flex items-center gap-1">
                    <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200">Accueil</Link>
                    <Link href="/posts" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200">Conseils</Link>
                    <Link href="/contact" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200">Contact</Link>

                    {session?.user ? (
                        <>
                            {session.user.role === 'admin' && (
                                <Link href="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200">
                                    Admin
                                </Link>
                            )}
                            <div className="ml-2 flex items-center gap-2">
                                <span className="text-xs text-slate-500 hidden sm:block">{session.user.name}</span>
                                <SignOutButton />
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className="ml-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md shadow-teal-500/20">
                            Connexion
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
