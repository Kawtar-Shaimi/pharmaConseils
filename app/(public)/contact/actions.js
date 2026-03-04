'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function submitContactForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    await prisma.message.create({
        data: { name, email, subject, message }
    });

    redirect('/contact?success=true');
}
