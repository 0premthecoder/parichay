"use client";

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const moods = [
  { emoji: '😞', label: 'Awful', value: 1 },
  { emoji: '😐', label: 'Okay', value: 2 },
  { emoji: '🙂', label: 'Good', value: 3 },
  { emoji: '😄', label: 'Great', value: 4 },
  { emoji: '😍', label: 'Awesome', value: 5 },
];

const chartData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 2 },
  { day: 'Wed', mood: 4 },
  { day: 'Thu', mood: 3 },
  { day: 'Fri', mood: 5 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: null },
];

const chartConfig = {
  mood: {
    label: 'Mood',
  },
} satisfies ChartConfig;

export default function MoodClient() {
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const { toast } = useToast();

  const handleMoodLog = (value: number) => {
    setTodayMood(value);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const dayIndex = chartData.findIndex(d => d.day === today);
    if(dayIndex !== -1) {
      chartData[dayIndex].mood = value;
    }
    toast({
      title: "Mood Logged!",
      description: `You've logged your mood as "${moods.find(m => m.value === value)?.label}".`,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Log Today's Mood</CardTitle>
          <CardDescription>Select an emoji that best represents how you feel right now.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-center p-4 bg-secondary rounded-lg">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodLog(mood.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-200 transform hover:scale-110",
                  todayMood === mood.value ? 'bg-primary/20 scale-110' : ''
                )}
                aria-label={`Log mood as ${mood.label}`}
              >
                <span className="text-4xl md:text-5xl">{mood.emoji}</span>
                <span className="text-sm font-medium text-muted-foreground">{mood.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Mood Trend</CardTitle>
          <CardDescription>Here is how your mood has varied this week.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => moods.find(m => m.value === value)?.label || ''}
                    indicator="dot"
                  />
                }
              />
              <Bar
                dataKey="mood"
                fill="hsl(var(--primary))"
                radius={8}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
