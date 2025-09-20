import { config } from 'dotenv';
config();

import '@/ai/flows/anonymous-peer-chat-matchmaking.ts';
import '@/ai/flows/ai-suggested-journal-prompts.ts';
import '@/ai/flows/ai-moderated-peer-chat.ts';
import '@/ai/flows/sentiment-analysis-for-journal-entries.ts';