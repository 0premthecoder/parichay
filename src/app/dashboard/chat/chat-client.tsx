"use client";

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Loader, Users, ShieldAlert, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { matchPeers } from '@/ai/flows/anonymous-peer-chat-matchmaking';
import { moderateChat } from '@/ai/flows/ai-moderated-peer-chat';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: number;
  sender: 'user' | 'peer' | 'system';
  text: string;
};

const chatTopics = [
  "Feeling Anxious",
  "Feeling Happy",
  "Work Stress",
  "Loneliness",
  "Relationship Issues",
  "Just want to talk",
];

export default function ChatClient() {
  const [topic, setTopic] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleFindPeer = async () => {
    if (!topic) {
      toast({
        variant: "destructive",
        title: "Select a topic",
        description: "Please choose a topic to start matching.",
      });
      return;
    }

    setIsMatching(true);
    setMessages([]);

    try {
      const result = await matchPeers({ feeling: topic, topic: topic });
      if (result.matchFound) {
        toast({
          title: "Match Found!",
          description: result.reason,
        });
        setMessages([
          { id: Date.now(), sender: 'system', text: "You've been connected with a peer. Say hello! All messages are anonymous and lightly moderated for safety." },
        ]);
        setIsChatting(true);
      } else {
        toast({
          variant: "default",
          title: "No Match Found",
          description: result.reason,
        });
      }
    } catch (error) {
      console.error("Failed to match peer:", error);
      toast({
        variant: "destructive",
        title: "Matching Error",
        description: "Could not find a peer. Please try again later.",
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const moderationResult = await moderateChat({ message: inputValue });
    if (moderationResult.isHarmful) {
      toast({
        variant: "destructive",
        title: "Message Blocked",
        description: `This message was flagged as potentially harmful. Reason: ${moderationResult.reason}`,
      });
      return;
    }

    const userMessage: Message = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate peer response
    setTimeout(() => {
      const peerResponse: Message = { id: Date.now() + 1, sender: 'peer', text: "I understand. Thanks for sharing that." };
      setMessages(prev => [...prev, peerResponse]);
    }, 1500);
  };
  
  const handleEndChat = () => {
    setIsChatting(false);
    setTopic('');
    setMessages([]);
    toast({
      title: "Chat Ended",
      description: "We hope the conversation was helpful.",
    });
  }

  if (!isChatting) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users /> Find a Peer</CardTitle>
          <CardDescription>Select what you'd like to talk about to find a peer with similar feelings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic or feeling..." />
            </SelectTrigger>
            <SelectContent>
              {chatTopics.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFindPeer} disabled={isMatching} className="w-full">
            {isMatching ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isMatching ? 'Searching for a peer...' : 'Find a Peer'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback><Bot /></AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Anonymous Peer</p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleEndChat}>End Chat</Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.sender === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : message.sender === 'peer'
                    ? 'bg-muted'
                    : 'mx-auto text-xs text-muted-foreground bg-transparent'
                )}
              >
                {message.sender === 'system' && <div className='flex items-center gap-2'><ShieldAlert className='h-4 w-4'/>{message.text}</div>}
                {message.sender !== 'system' && message.text}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!inputValue}>
            <CornerDownLeft className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
