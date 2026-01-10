import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SignupPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'auth-background');
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
        {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <Card className="w-full max-w-md z-10 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join RoamReady and start planning your next adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
