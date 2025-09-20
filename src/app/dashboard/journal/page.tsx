import JournalClient from './journal-client';

export default function JournalPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Smart Journal
        </h1>
        <p className="text-muted-foreground">
          Your private space to reflect, with a little help from AI.
        </p>
      </div>
      <JournalClient />
    </div>
  );
}
