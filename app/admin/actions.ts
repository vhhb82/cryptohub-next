'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteNewsAction(formData: FormData) {
  const id = Number(formData.get('id')); if (!id || Number.isNaN(id)) return;
  await prisma.news.delete({ where: { id } }).catch(()=>{});
  revalidatePath('/admin'); revalidatePath('/stiri');
}
export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get('id')); if (!id || Number.isNaN(id)) return;
  await prisma.post.delete({ where: { id } }).catch(()=>{});
  revalidatePath('/admin'); revalidatePath('/blog');
}
export async function deleteProductAction(formData: FormData) {
  const id = Number(formData.get('id')); if (!id || Number.isNaN(id)) return;
  try{ // dacă nu există modelul, ignorăm
    // @ts-ignore
    await prisma.product.delete({ where: { id } });
  }catch(_){}
  revalidatePath('/admin'); revalidatePath('/produse');
}
export async function deleteVideoAction(formData: FormData) {
  const id = Number(formData.get('id')); if (!id || Number.isNaN(id)) return;
  try{ await prisma.video.delete({ where: { id } }); }catch(_){}
  revalidatePath('/admin'); revalidatePath('/video');
}

export async function createNewsAction(formData: FormData){
  const data:any = {
    title: String(formData.get('title')||''),
    slug: String(formData.get('slug')||''),
    excerpt: String(formData.get('excerpt')||''),
    content: String(formData.get('content')||''),
    image: (formData.get('image') as string) || null,
    titleEn: String(formData.get('titleEn')||''),
    excerptEn: String(formData.get('excerptEn')||''),
    contentEn: String(formData.get('contentEn')||''),
    published: true,
  };
  await prisma.news.create({ data }).catch((e)=>{ console.error(e) });
  revalidatePath('/admin'); revalidatePath('/stiri');
}

export async function createPostAction(formData: FormData){
  const data:any = {
    title: String(formData.get('title')||''),
    slug: String(formData.get('slug')||''),
    excerpt: String(formData.get('excerpt')||''),
    content: String(formData.get('content')||''),
    image: (formData.get('image') as string) || null,
    titleEn: String(formData.get('titleEn')||''),
    excerptEn: String(formData.get('excerptEn')||''),
    contentEn: String(formData.get('contentEn')||''),
    published: true,
  };
  await prisma.post.create({ data }).catch((e)=>{ console.error(e) });
  revalidatePath('/admin'); revalidatePath('/blog');
}

export async function createProductAction(formData: FormData){
  const data:any = {
    title: String(formData.get('title')||''),
    titleEn: String(formData.get('titleEn')||''),
    bullets: String(formData.get('bullets')||''),
    bulletsEn: String(formData.get('bulletsEn')||''),
    href: String(formData.get('href')||''),
    image: (formData.get('image') as string) || null,
    published: true,
  };
  try{ // modelul Product poate să nu existe; tratează grațios
    // @ts-ignore
    await prisma.product.create({ data });
  }catch(e){ console.error("Create product failed, verifică Prisma model Product:", e); }
  revalidatePath('/admin'); revalidatePath('/produse');
}

export async function createVideoAction(formData: FormData){
  const data:any = {
    title: String(formData.get('title')||''),
    titleEn: String(formData.get('titleEn')||''),
    url: String(formData.get('url')||''),
    source: String(formData.get('source')||'youtube'),
    published: true,
  };
  try{ await prisma.video.create({ data }); }catch(e){ console.error(e); }
  revalidatePath('/admin'); revalidatePath('/video');
}
