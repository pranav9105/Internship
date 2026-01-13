
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SignupForm } from '@/components/auth/signup-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function SignupPage() {
    const authImage = PlaceHolderImages.find((img) => img.id === 'auth-background-4');

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-8">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <Logo />
                    </div>
                    <CardTitle className="font-headline text-4xl">Create an Account</CardTitle>
                    <CardDescription>Let&apos;s get you started.</CardDescription>
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
        <div className="hidden lg:block relative">
            {authImage && (
                <Image
                    src={authImage.imageUrl}
                    alt={authImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={authImage.imageHint}
                />
            )}
        </div>
    </div>
  );
}
