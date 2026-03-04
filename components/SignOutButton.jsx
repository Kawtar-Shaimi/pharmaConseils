'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
        >
            Déconnexion
        </button>
    );
}
