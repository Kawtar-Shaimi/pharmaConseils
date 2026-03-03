import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-sm py-5">
            <div className="container mx-auto px-5 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
                    <span className="bg-teal-500 text-white p-2 rounded-lg">PC</span> PharmaConseils
                </Link>
                <nav className="flex gap-7">
                    <Link href="/" className="font-medium text-slate-700 hover:text-teal-500 transition">Accueil</Link>
                    <Link href="/posts" className="font-medium text-slate-700 hover:text-teal-500 transition">Conseils</Link>
                    <Link href="#" className="font-medium text-slate-700 hover:text-teal-500 transition">Vidéos</Link>
                    <Link href="/contact" className="font-medium text-slate-700 hover:text-teal-500 transition">Contact</Link>
                    <Link href="/login" className="font-medium text-slate-700 hover:text-teal-500 transition">Connexion</Link>
                </nav>
            </div>
        </header>
    );
}
