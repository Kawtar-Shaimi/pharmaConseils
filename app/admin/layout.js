import Link from 'next/link';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
    const session = await auth();
    if (!session) redirect('/login');

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/posts', label: 'Articles', icon: '📝' },
        { href: '/admin/categories', label: 'Catégories', icon: '📂' },
        { href: '/admin/comments', label: 'Commentaires', icon: '💬' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-700/50">
                    <Link href="/admin" className="flex items-center gap-2.5 text-lg font-bold">
                        <span className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white p-2 rounded-xl text-xs">PC</span>
                        <span className="text-white">Admin Panel</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group"
                        >
                            <span className="text-base">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-xs font-bold">
                            {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                        </div>
                    </div>
                    <Link href="/" className="mt-3 flex items-center gap-2 px-4 py-2 text-xs text-slate-400 hover:text-white transition">
                        ← Retour au site
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 md:p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
