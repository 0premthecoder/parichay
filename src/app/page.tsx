import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Parichay
          </h1>
        </div>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="absolute inset-0 -z-10 h-full w-full bg-background 
              bg-[linear-gradient(to_right,#D0BFFF_1px,transparent_1px),linear-gradient(to_bottom,#D0BFFF_1px,transparent_1px)] 
              bg-[size:4rem_4rem] opacity-20 dark:opacity-10">
            </div>
            <div className="relative">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
                A mindful space for your thoughts.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Parichay helps you track moods, journal thoughts, and connect anonymously with peers in a safe, private environment.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/login">
                    Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Parichay. All rights reserved.</p>
      </footer>
    </div>
  );
}
