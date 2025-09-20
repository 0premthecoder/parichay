'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating AI-suggested journal prompts.
 *
 * The flow takes a user's current mood as input and returns a list of relevant journaling prompts.
 *
 * @exports {
 *   generateJournalPrompts,
 *   GenerateJournalPromptsInput,
 *   GenerateJournalPromptsOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJournalPromptsInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
});
export type GenerateJournalPromptsInput = z.infer<typeof GenerateJournalPromptsInputSchema>;

const GenerateJournalPromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('A list of suggested journaling prompts.'),
});
export type GenerateJournalPromptsOutput = z.infer<typeof GenerateJournalPromptsOutputSchema>;

export async function generateJournalPrompts(input: GenerateJournalPromptsInput): Promise<GenerateJournalPromptsOutput> {
  return generateJournalPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJournalPromptsPrompt',
  input: {schema: GenerateJournalPromptsInputSchema},
  output: {schema: GenerateJournalPromptsOutputSchema},
  prompt: `You are a helpful AI assistant designed to suggest journaling prompts based on the user's current mood.

  Given the user's mood: {{{mood}}},
  suggest 3 journaling prompts that can help them reflect and explore their feelings.
  Return the prompts as a JSON array of strings.
  `,
});

const generateJournalPromptsFlow = ai.defineFlow(
  {
    name: 'generateJournalPromptsFlow',
    inputSchema: GenerateJournalPromptsInputSchema,
    outputSchema: GenerateJournalPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
