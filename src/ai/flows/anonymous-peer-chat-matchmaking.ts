'use server';
/**
 * @fileOverview Matches users for anonymous peer chat based on similar feelings.
 *
 * - matchPeers - A function to match users with similar feelings for anonymous chat.
 * - MatchPeersInput - The input type for the matchPeers function.
 * - MatchPeersOutput - The return type for the matchPeers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchPeersInputSchema = z.object({
  feeling: z
    .string()
    .describe('The current feeling of the user seeking a chat partner.'),
  topic: z.string().describe('The topic the user wants to discuss.'),
});
export type MatchPeersInput = z.infer<typeof MatchPeersInputSchema>;

const MatchPeersOutputSchema = z.object({
  matchFound: z
    .boolean()
    .describe('Whether a match was found for the user or not.'),
  peerId: z.string().describe('An anonymous ID of the matched peer.'),
  reason: z.string().describe('Reason for the match (or why no match was found).'),
});
export type MatchPeersOutput = z.infer<typeof MatchPeersOutputSchema>;

export async function matchPeers(input: MatchPeersInput): Promise<MatchPeersOutput> {
  return matchPeersFlow(input);
}

const matchPeersPrompt = ai.definePrompt({
  name: 'matchPeersPrompt',
  input: {schema: MatchPeersInputSchema},
  output: {schema: MatchPeersOutputSchema},
  prompt: `You are an AI assistant designed to match users for anonymous peer chat.

A user is currently feeling "{{feeling}}" and wants to discuss "{{topic}}".

Determine if a suitable match can be found.  Since this is a demo, you can always "find" a match.

Return a peerId of "demo-peer-1" if you find a match.

Return matchFound=true if you found a match, and false otherwise.

Explain the reason for the match in the "reason" field.
`,
});

const matchPeersFlow = ai.defineFlow(
  {
    name: 'matchPeersFlow',
    inputSchema: MatchPeersInputSchema,
    outputSchema: MatchPeersOutputSchema,
  },
  async input => {
    const {output} = await matchPeersPrompt(input);
    return output!;
  }
);
