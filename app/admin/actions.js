'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ============ POSTS ============

export async function createPost(formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    const category_id = parseInt(formData.get('category_id'));
    const image = formData.get('image') || null;
    const type = formData.get('type') || 'text';
    const video_url = formData.get('video_url') || null;
    const is_published = formData.get('is_published') === 'on';

    const slug = title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    try {
        await prisma.post.create({
            data: {
                title,
                slug: `${slug}-${Date.now()}`,
                content,
                category_id,
                user_id: 1,
                image,
                type,
                video_url,
                is_published,
                published_at: is_published ? new Date() : null,
            },
        });
        revalidatePath('/admin/posts');
        revalidatePath('/posts');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Create post error:', error);
        return { error: 'Erreur lors de la création.' };
    }
}

export async function updatePost(id, formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    const category_id = parseInt(formData.get('category_id'));
    const image = formData.get('image') || null;
    const type = formData.get('type') || 'text';
    const video_url = formData.get('video_url') || null;
    const is_published = formData.get('is_published') === 'on';

    try {
        await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                category_id,
                image,
                type,
                video_url,
                is_published,
                published_at: is_published ? new Date() : null,
            },
        });
        revalidatePath('/admin/posts');
        revalidatePath('/posts');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Update post error:', error);
        return { error: 'Erreur lors de la modification.' };
    }
}

export async function deletePost(id) {
    try {
        await prisma.post.delete({ where: { id: parseInt(id) } });
        revalidatePath('/admin/posts');
        revalidatePath('/posts');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Delete post error:', error);
        return { error: 'Erreur lors de la suppression.' };
    }
}

// ============ CATEGORIES ============

export async function createCategory(formData) {
    const name = formData.get('name');
    const icon = formData.get('icon') || null;
    const slug = name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    try {
        await prisma.category.create({
            data: { name, slug: `${slug}-${Date.now()}`, icon },
        });
        revalidatePath('/admin/categories');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Create category error:', error);
        return { error: 'Erreur lors de la création.' };
    }
}

export async function deleteCategory(id) {
    try {
        await prisma.category.delete({ where: { id: parseInt(id) } });
        revalidatePath('/admin/categories');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Delete category error:', error);
        return { error: 'Erreur: supprimez d\'abord les articles liés.' };
    }
}

// ============ COMMENTS ============

export async function approveComment(id) {
    try {
        await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { is_approved: true },
        });
        revalidatePath('/admin/comments');
        return { success: true };
    } catch (error) {
        return { error: 'Erreur.' };
    }
}

export async function deleteComment(id) {
    try {
        await prisma.comment.delete({ where: { id: parseInt(id) } });
        revalidatePath('/admin/comments');
        return { success: true };
    } catch (error) {
        return { error: 'Erreur.' };
    }
}

// ============ NEWSLETTER ============

export async function subscribeNewsletter(formData) {
    const email = formData.get('email');
    if (!email) return { error: 'Email requis.' };

    try {
        const existing = await prisma.subscriber.findUnique({ where: { email } });
        if (existing) return { error: 'Vous êtes déjà abonné !' };

        await prisma.subscriber.create({ data: { email } });
        return { success: true, message: 'Merci pour votre abonnement !' };
    } catch (error) {
        return { error: 'Erreur lors de l\'abonnement.' };
    }
}
