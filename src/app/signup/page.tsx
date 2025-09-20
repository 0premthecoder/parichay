import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <div
        className="absolute inset-0 -z-10 h-full w-full bg-background 
        bg-[linear-gradient(to_right,#D0BFFF_1px,transparent_1px),linear-gradient(to_bottom,#D0BFFF_1px,transparent_1px)] 
        bg-[size:4rem_4rem] opacity-20 dark:opacity-10">
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Logo className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to begin your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Name</Label>
            <Input id="first-name" placeholder="Your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/dashboard">Create Account</Link>
          </Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
