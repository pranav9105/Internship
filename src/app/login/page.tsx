
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const authImage = PlaceHolderImages.find((img) => img.id === 'auth-background-4');

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                 <div className="mb-4 flex justify-center">
                    <Logo />
                </div>
                <CardTitle className="font-headline text-4xl">Welcome Back</CardTitle>
                <CardDescription>Sign in to continue</CardDescription>
            </CardHeader>
            <CardContent>
            <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
                 <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
                    FORGOT PASSWORD?
                </Link>
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
                    Sign up
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
