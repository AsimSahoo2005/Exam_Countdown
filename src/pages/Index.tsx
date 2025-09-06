import { EventManager } from '@/components/EventManager';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <header className="text-center mb-12 md:mb-16 relative">
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Exam Countdown Hub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage multiple exam countdowns with notifications, progress tracking, and customizable themes
            </p>
          </header>

          {/* Event Manager */}
          <main>
            <EventManager />
          </main>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              Good luck with your studies! 📚✨
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
