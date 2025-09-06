import { useState, useEffect } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CountdownEvent } from '@/types/event';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  event: CountdownEvent;
  onDelete: (id: string) => void;
}

const CountdownTimer = ({ event, onDelete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const difference = event.targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event.targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const isCompleted = new Date() > event.targetDate;
  const totalTime = timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds;

  return (
    <div className="w-full">
      <Card 
        className="border-2 shadow-xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
        style={{ borderColor: event.color + '40' }}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ background: `linear-gradient(135deg, ${event.color}20 0%, transparent 100%)` }}
        />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {event.title}
            </h3>
            {event.description && (
              <p className="text-muted-foreground text-sm">{event.description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(event.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Status */}
        {isCompleted ? (
          <div className="text-center py-8">
            <div className="text-4xl md:text-6xl font-bold mb-4" style={{ color: event.color }}>
              🎉 EXAM COMPLETED! 🎉
            </div>
            <p className="text-lg text-muted-foreground">Hope it went well!</p>
          </div>
        ) : totalTime === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl md:text-6xl font-bold mb-4" style={{ color: event.color }}>
              🚀 EXAM STARTED! 🚀
            </div>
            <p className="text-lg text-muted-foreground">Good luck!</p>
          </div>
        ) : (
          <>
            {/* Countdown Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' },
              ].map((item, index) => (
                <div key={item.label} className="text-center group">
                  <div className="relative">
                    <div 
                      className="text-3xl md:text-5xl font-bold mb-2 font-mono tracking-tight transition-all duration-300 group-hover:scale-110"
                      style={{ color: event.color }}
                    >
                      {formatNumber(item.value)}
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator 
              targetDate={event.targetDate}
              createdAt={event.createdAt}
              className="mb-6"
            />
          </>
        )}
        
        {/* Target Date Info */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-muted-foreground text-center text-sm">
            Exam scheduled for{' '}
            <span className="font-semibold" style={{ color: event.color }}>
              {event.targetDate.toLocaleDateString()} at {event.targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CountdownTimer;