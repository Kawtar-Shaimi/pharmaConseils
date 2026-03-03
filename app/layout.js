import { Instrument_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const instrumentSans = Instrument_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-instrument-sans',
});

export const metadata = {
    title: 'PharmaConseils - Votre santé, nos conseils',
    description: 'Votre source de confiance pour tous vos conseils santé et bien-être.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`${instrumentSans.variable}`}>
            <body className="bg-slate-50 text-slate-700 font-sans antialiased min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
