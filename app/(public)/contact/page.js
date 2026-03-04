import { submitContactForm } from './actions';

export default async function ContactPage({ searchParams }) {
    // Wait for searchParams (Next.js 15 requirement)
    const params = await searchParams;
    const isSuccess = params.success === 'true';

    return (
        <div className="container mx-auto px-5 py-16">
            {isSuccess && (
                <div className="max-w-xl mx-auto mb-8 bg-emerald-100 text-emerald-800 p-4 rounded-lg text-center">
                    Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais !
                </div>
            )}

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Contactez-nous</h2>
                <p className="text-slate-600">Une question ? Besoin d'un conseil ? N'hésitez pas à nous écrire.</p>
            </div>

            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <form action={submitContactForm}>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-slate-700">Nom complet</label>
                        <input type="text" name="name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-slate-700">Email</label>
                        <input type="email" name="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-slate-700">Sujet</label>
                        <input type="text" name="subject" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-slate-700">Message</label>
                        <textarea name="message" rows="5" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition">Envoyer le message</button>
                </form>
            </div>
        </div>
    );
}
