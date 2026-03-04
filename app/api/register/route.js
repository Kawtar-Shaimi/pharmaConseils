import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'user',
            },
        });

        return NextResponse.json({ message: 'Compte créé avec succès !' }, { status: 201 });
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}
