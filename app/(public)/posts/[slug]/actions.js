'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitComment(formData) {
    const post_id = parseInt(formData.get('post_id'), 10);
    const parent_id = formData.get('parent_id') ? parseInt(formData.get('parent_id'), 10) : null;
    const content = formData.get('content');

    // Hardcode user_id = 1 for now since auth is not fully migrated
    const user_id = 1;

    await prisma.comment.create({
        data: {
            content,
            post_id,
            user_id,
            parent_id,
            is_approved: false // Typically comments need approval in this app
        }
    });

    revalidatePath(`/posts`);
}
