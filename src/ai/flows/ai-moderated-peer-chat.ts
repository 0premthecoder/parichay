'use server';
/**
 * @fileOverview AI-moderated peer chat flow for flagging harmful content.
 *
 * - moderateChat - A function to moderate the peer chat.
 * - ModerateChatInput - The input type for the moderateChat function.
 * - ModerateChatOutput - The return type for the moderateChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateChatInputSchema = z.object({
  message: z.string().describe('The chat message to be checked for harmful content.'),
});
export type ModerateChatInput = z.infer<typeof ModerateChatInputSchema>;

const ModerateChatOutputSchema = z.object({
  isHarmful: z.boolean().describe('Whether the message is flagged as harmful.'),
  reason: z.string().describe('The reason why the message was flagged as harmful.'),
});
export type ModerateChatOutput = z.infer<typeof ModerateChatOutputSchema>;

export async function moderateChat(input: ModerateChatInput): Promise<ModerateChatOutput> {
  return moderateChatFlow(input);
}

const moderationPrompt = ai.definePrompt({
  name: 'moderationPrompt',
  input: {schema: ModerateChatInputSchema},
  output: {schema: ModerateChatOutputSchema},
  prompt: `You are an AI moderation bot that flags harmful content in a peer chat.
  Determine whether the following message is harmful or not. If it is, explain why.
  Message: {{{message}}}
  Respond in JSON format with isHarmful (boolean) and reason (string).`,
});

const moderateChatFlow = ai.defineFlow(
  {
    name: 'moderateChatFlow',
    inputSchema: ModerateChatInputSchema,
    outputSchema: ModerateChatOutputSchema,
  },
  async input => {
    const {output} = await moderationPrompt(input);
    return output!;
  }
);
