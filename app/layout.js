import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata = {
    title: 'PharmaConseils - Votre santé, nos conseils',
    description: 'Votre source de confiance pour tous vos conseils santé et bien-être. Découvrez nos conseils d\'experts pharmaciens.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={inter.variable}>
            <body className="bg-slate-50 text-slate-700 antialiased min-h-screen flex flex-col">
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
