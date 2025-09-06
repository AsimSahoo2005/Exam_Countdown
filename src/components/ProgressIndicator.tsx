import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  targetDate: Date;
  createdAt: Date;
  className?: string;
}

export function ProgressIndicator({ targetDate, createdAt, className }: ProgressIndicatorProps) {
  const now = new Date();
  const totalTime = targetDate.getTime() - createdAt.getTime();
  const timeElapsed = now.getTime() - createdAt.getTime();
  const progressPercentage = Math.min(Math.max((timeElapsed / totalTime) * 100, 0), 100);

  const isCompleted = now > targetDate;
  const finalProgress = isCompleted ? 100 : progressPercentage;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{Math.round(finalProgress)}%</span>
      </div>
      <Progress 
        value={finalProgress} 
        className="h-2"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Started</span>
        <span>{isCompleted ? 'Completed' : 'Exam Day'}</span>
      </div>
    </div>
  );
}