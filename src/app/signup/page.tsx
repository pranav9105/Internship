
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SignupForm } from '@/components/auth/signup-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function SignupPage() {
    const authImage = PlaceHolderImages.find((img) => img.id === 'auth-background-4');

  return (
    <div className="relative w-full min-h-screen">
       {authImage && (
        <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            fill
            className="object-cover"
            data-ai-hint={authImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <Card className="w-full max-w-md mx-auto bg-black/50 border-gray-700">
            <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                    <Logo />
                </div>
                <CardTitle className="font-headline text-4xl text-white">Create an Account</CardTitle>
                <CardDescription className="text-gray-300">Let&apos;s get you started.</CardDescription>
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
    </div>
  );
}
