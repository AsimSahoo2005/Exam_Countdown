import CountdownTimer from '@/components/CountdownTimer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Exam Countdown
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay focused and track your time until the big day
          </p>
        </header>

        {/* Countdown Timer */}
        <main className="flex justify-center">
          <CountdownTimer />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Good luck with your studies! 📚✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
