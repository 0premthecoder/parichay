import Link from 'next/link';
import { BookHeart, HeartPulse, MessagesSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: BookHeart,
    title: 'Smart Journaling',
    description: 'Reflect on your day with AI-powered prompts and sentiment analysis.',
    href: '/dashboard/journal',
    cta: 'Open Journal',
  },
  {
    icon: HeartPulse,
    title: 'Mood Tracker',
    description: 'Log your daily emotions and visualize your mental well-being over time.',
    href: '/dashboard/mood',
    cta: 'Track Mood',
  },
  {
    icon: MessagesSquare,
    title: 'Anonymous Peer Chat',
    description: 'Connect with a peer who understands. Safe, anonymous, and supportive.',
    href: '/dashboard/chat',
    cta: 'Start Chatting',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your mindful journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-full">
                  <feature.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={feature.href}>{feature.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <Card className="mt-4">
        <CardHeader>
          <CardTitle>A quick tip for today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Take a moment to practice deep breathing. Inhale for 4 seconds, hold for 4 seconds, and exhale for 6 seconds. Repeat a few times to calm your mind.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
