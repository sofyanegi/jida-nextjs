import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Post } from '@/lib/definitions';
import Link from 'next/link';

export default function PostCard(post: Post) {
  const { slug, title, createdAt, description } = post;

  return (
    <Card key={slug} className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{formatDate(createdAt!)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/blog/${slug}`}>
            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
