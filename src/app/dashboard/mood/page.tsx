import MoodClient from './mood-client';

export default function MoodPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground">
          How are you feeling today? Log your mood to see your trends.
        </p>
      </div>
      <MoodClient />
    </div>
  );
}
