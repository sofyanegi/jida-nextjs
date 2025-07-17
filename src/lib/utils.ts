import { clsx, type ClassValue } from 'clsx';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
}

export function generateUniqueSlug(text: string) {
  return slugify(text, { lower: true, strict: true }) + '-' + Math.floor(Math.random() * 100);
}
