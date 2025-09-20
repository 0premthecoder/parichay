import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', props.className)}
      {...props}
    >
      <title>Parichay Logo</title>
      <path d="M12 8.5C12 8.5 14 6.5 16 6.5C18 6.5 20 8.5 20 11C20 14 12 20 12 20C12 20 4 14 4 11C4 8.5 6 6.5 8 6.5C10 6.5 12 8.5 12 8.5Z" />
      <path d="M12 8.5V14" />
      <path d="M9.5 11.5L14.5 11.5" />
    </svg>
  );
}
