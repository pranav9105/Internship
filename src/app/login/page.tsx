import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your dashboard and bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
