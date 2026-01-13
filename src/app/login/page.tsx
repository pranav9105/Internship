
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15.545 6.545a9 9 0 1 1-12.09 0" />
      <path d="M12 3v1" />
      <path d="M18.27 7.73l-.71.71" />
      <path d="M5.73 7.73l.71.71" />
      <path d="M12 21a9 9 0 0 0 9-9h-9z" />
    </svg>
  );
  
  const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10C2.5 6 4.5 4 7.5 4h9c3 0 5 2 5 3v10c0 1-2 3-5 3h-9c-3 0-5-2-5-3Z" />
      <path d="m10 9 5 3-5 3Z" />
    </svg>
  );
  
  const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

export default function LoginPage() {
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
        <Card className="w-full max-w-md mx-auto bg-black/30 border-gray-700">
            <CardHeader className="text-center">
                 <div className="mb-4 flex justify-center">
                    <Logo />
                </div>
                <CardTitle className="font-headline text-4xl text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-300">Sign in to continue</CardDescription>
            </CardHeader>
            <CardContent>
            <LoginForm />
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
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">
                    <GoogleIcon className="h-5 w-5" />
                    <span className="sr-only">Google</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">
                    <YoutubeIcon className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">
                    <FacebookIcon className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                </Button>
            </div>
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
    </div>
  );
}
