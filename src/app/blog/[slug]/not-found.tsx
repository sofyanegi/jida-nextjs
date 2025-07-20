import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileX2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center p-4">
      <FileX2 className="h-20 w-20 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold">Post Not Found</h1>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">Sorry, the page you are looking for does not exist.</p>
      <Button asChild>
        <Link href="/blog">See All Posts</Link>
      </Button>
    </div>
  );
}
