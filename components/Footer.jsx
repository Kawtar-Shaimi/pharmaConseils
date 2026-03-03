import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 mt-auto">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
                    <div className="col-span-2">
                        <span className="text-white text-2xl font-bold mb-5 block">PharmaConseils</span>
                        <p>Votre source de confiance pour tous vos conseils santé et bien-être.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-5">Contenus</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white">Vidéos conseils</Link></li>
                            <li><Link href="#" className="hover:text-white">Guides santé</Link></li>
                            <li><Link href="#" className="hover:text-white">Articles</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-5">Catégories</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white">Médicaments</Link></li>
                            <li><Link href="#" className="hover:text-white">Prévention</Link></li>
                            <li><Link href="#" className="hover:text-white">Nutrition</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-5">Contact</h4>
                        <ul className="space-y-2">
                            <li>05 22 45 67 89</li>
                            <li>contact@pharmaconseils.ma</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-5 text-center text-sm">
                    &copy; {new Date().getFullYear()} PharmaConseils. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
