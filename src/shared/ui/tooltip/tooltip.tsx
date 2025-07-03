import type React from 'react';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ScnTooltip,
} from '../../lib/shadcn/tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <TooltipProvider>
      <ScnTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </ScnTooltip>
    </TooltipProvider>
  );
};
