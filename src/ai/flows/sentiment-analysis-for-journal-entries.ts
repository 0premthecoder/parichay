'use server';
/**
 * @fileOverview Analyzes the sentiment of journal entries.
 *
 * - analyzeSentiment - A function that analyzes the sentiment of a journal entry.
 * - SentimentAnalysisInput - The input type for the analyzeSentiment function.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentAnalysisInputSchema = z.object({
  journalEntry: z
    .string()
    .describe('The journal entry to analyze.'),
});
export type SentimentAnalysisInput = z.infer<typeof SentimentAnalysisInputSchema>;

const SentimentAnalysisOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'neutral', 'negative'])
    .describe('The sentiment of the journal entry.'),
  score: z
    .number()
    .min(-1)
    .max(1)
    .describe('A numerical score between -1 and 1 indicating sentiment strength.'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeSentiment(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
  return analyzeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentAnalysisInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `Analyze the sentiment of the following journal entry:

Journal Entry: {{{journalEntry}}}

Determine whether the sentiment is positive, neutral, or negative.
Also, provide a numerical score between -1 and 1 to indicate sentiment strength.
`,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: SentimentAnalysisInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
