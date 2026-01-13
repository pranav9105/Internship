
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SignupForm } from '@/components/auth/signup-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.67-4.17 1.67-4.97 0-9-4.03-9-9s4.03-9 9-9c2.82 0 4.93 1.1 6.3 2.42l2.34-2.34C19.23 3.46 16.31 2 12.48 2 6.94 2 2.53 6.44 2.53 12s4.41 10 9.95 10c5.42 0 9.54-3.75 9.54-9.75 0-.65-.07-1.25-.17-1.83h-9.84Z"/>
    </svg>
);
  
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 1.6 3.6 0 5.1-2.4 2.5-5.9 4-9.5 4s-7.1-1.5-9.5-4c-1.6-1.5-1.6-3.6 0-5.1 1.4-1.4 2.8-2.1 5-2.1s3.7.8 5 2.1c1.2 1.3 2 3.4 2 3.4Z" />
    </svg>
);
  
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

export default function SignupPage() {
    const authImage = PlaceHolderImages.find((img) => img.id === 'auth-background-4');
    const auth = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleGoogleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push('/welcome');
      } catch (error: any) {
        console.error("Google Sign-in error", error);
        toast({
          title: "Google Sign-in Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

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
        <Card className="w-full max-w-md mx-auto bg-black/30 border-gray-700">
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
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black/30 px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 px-6 pb-6">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white" onClick={handleGoogleSignIn}>
                    <GoogleIcon className="h-5 w-5 fill-current" />
                    <span className="sr-only">Google</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">
                    <FacebookIcon className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                </Button>
            </div>
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
