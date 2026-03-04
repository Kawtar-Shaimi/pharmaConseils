import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }) {
    return (
        <>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <div className="mt-32">
                <Footer />
            </div>
        </>
    );
}
