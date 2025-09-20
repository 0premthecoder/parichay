import ChatClient from './chat-client';

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-10rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Anonymous Peer Chat
        </h1>
        <p className="text-muted-foreground">
          Connect with someone who feels the same. You are not alone.
        </p>
      </div>
      <ChatClient />
    </div>
  );
}
