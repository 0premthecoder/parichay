"use client";

import { useState } from 'react';
import { Wand2, Send, BrainCircuit, Bot, Smile, Frown, Meh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateJournalPrompts } from '@/ai/flows/ai-suggested-journal-prompts';
import { analyzeSentiment, type SentimentAnalysisOutput } from '@/ai/flows/sentiment-analysis-for-journal-entries';
import { Skeleton } from '@/components/ui/skeleton';

type JournalEntry = {
  id: number;
  date: string;
  content: string;
  sentiment?: SentimentAnalysisOutput;
};

const pastEntriesData: JournalEntry[] = [
  {
    id: 1,
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    content: "Today was a really good day. I finished a big project at work and felt a huge sense of accomplishment. I should celebrate these small wins more often.",
    sentiment: { sentiment: 'positive', score: 0.8 },
  },
  {
    id: 2,
    date: new Date(Date.now() - 172800000).toLocaleDateString(),
    content: "Feeling a bit stressed about the upcoming week. There's a lot to do, and I'm not sure where to start. Trying to remind myself to take it one step at a time.",
    sentiment: { sentiment: 'negative', score: -0.6 },
  },
];

export default function JournalClient() {
  const [entry, setEntry] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isPromptsLoading, setIsPromptsLoading] = useState(false);
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);
  const [sentiment, setSentiment] = useState<SentimentAnalysisOutput | null>(null);
  const [pastEntries, setPastEntries] = useState<JournalEntry[]>(pastEntriesData);
  const { toast } = useToast();

  const handleGetPrompts = async () => {
    setIsPromptsLoading(true);
    setPrompts([]);
    try {
      const mood = sentiment?.sentiment || 'neutral';
      const result = await generateJournalPrompts({ mood });
      setPrompts(result.prompts);
    } catch (error) {
      console.error("Failed to get prompts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI prompts. Please try again.",
      });
    } finally {
      setIsPromptsLoading(false);
    }
  };

  const handleAnalyzeAndSave = async () => {
    if (entry.trim().length < 10) {
      toast({
        variant: "destructive",
        title: "Entry too short",
        description: "Please write a bit more before saving.",
      });
      return;
    }
    setIsSentimentLoading(true);
    setSentiment(null);
    try {
      const result = await analyzeSentiment({ journalEntry: entry });
      setSentiment(result);
      
      const newEntry: JournalEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        content: entry,
        sentiment: result
      };
      setPastEntries(prev => [newEntry, ...prev]);
      setEntry('');

      toast({
        title: "Entry Saved!",
        description: "Your journal entry has been saved and analyzed.",
      });

    } catch (error) {
      console.error("Failed to analyze sentiment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not analyze your entry. Please try again.",
      });
    } finally {
      setIsSentimentLoading(false);
    }
  };

  const SentimentIcon = ({ sentiment }: { sentiment: 'positive' | 'negative' | 'neutral' }) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      case 'neutral': return <Meh className="w-5 h-5 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>Write down your thoughts and feelings. Don't worry, it's just for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind today?"
              className="min-h-[200px] text-base"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            {sentiment && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-secondary rounded-lg">
                <BrainCircuit className="w-5 h-5" />
                <span>AI Analysis: Your entry seems to be </span>
                <Badge variant={sentiment.sentiment === 'positive' ? 'default' : sentiment.sentiment === 'negative' ? 'destructive' : 'secondary'}>{sentiment.sentiment}</Badge>
                .
              </div>
            )}
            <div className="space-y-2">
                <Button onClick={handleGetPrompts} variant="outline" disabled={isPromptsLoading}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isPromptsLoading ? 'Getting prompts...' : 'Suggest a prompt'}
                </Button>
                {isPromptsLoading && <div className="space-y-2 pt-2"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>}
                {prompts.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {prompts.map((p, i) => (
                      <button key={i} onClick={() => setEntry(prev => prev ? `${prev}\n\n${p}` : p)} className="w-full text-left p-3 bg-secondary rounded-lg hover:bg-accent transition-colors flex items-start gap-3">
                        <Bot className="w-4 h-4 mt-1 shrink-0"/>
                        <span className="text-sm text-secondary-foreground">{p}</span>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyzeAndSave} disabled={!entry || isSentimentLoading}>
              {isSentimentLoading ? 'Analyzing...' : 'Save & Analyze'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Past Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {pastEntries.length > 0 ? (
              pastEntries.map((pastEntry) => (
                <div key={pastEntry.id} className="p-4 border rounded-lg bg-background">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">{pastEntry.date}</p>
                    {pastEntry.sentiment && <SentimentIcon sentiment={pastEntry.sentiment.sentiment} />}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{pastEntry.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No past entries yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
