import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      // Set target date to October 1st, 2024 at 10:30 AM
      const targetDate = new Date();
      targetDate.setMonth(9); // October (0-indexed)
      targetDate.setDate(1);
      targetDate.setHours(10, 30, 0, 0);

      // If we're past October 1st of this year, set it for next year
      const now = new Date();
      if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
      }

      const difference = targetDate.getTime() - now.getTime();

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
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-countdown-bg border-countdown-accent/20 shadow-2xl shadow-countdown-accent/10 p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item, index) => (
            <div key={item.label} className="text-center group">
              <div className="relative">
                <div className="text-5xl md:text-7xl font-bold text-countdown-text mb-2 font-mono tracking-tight transition-all duration-300 group-hover:scale-110">
                  {formatNumber(item.value)}
                </div>
                <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-countdown-accent/20 mb-2 font-mono tracking-tight blur-sm">
                  {formatNumber(item.value)}
                </div>
              </div>
              <div className="text-countdown-accent text-sm md:text-base font-medium uppercase tracking-wider">
                {item.label}
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-countdown-accent/30 text-2xl">
                  :
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-countdown-accent/20">
          <p className="text-countdown-text/70 text-center text-sm md:text-base">
            Time remaining until your exam on{' '}
            <span className="text-countdown-accent font-semibold">October 1st at 10:30 AM</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CountdownTimer;