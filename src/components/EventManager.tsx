import { useState } from 'react';
import { CountdownEvent } from '@/types/event';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNotifications } from '@/hooks/useNotifications';
import CountdownTimer from '@/components/CountdownTimer';
import { EventForm } from '@/components/EventForm';

export function EventManager() {
  const [events, setEvents] = useLocalStorage<CountdownEvent[]>('countdown-events', []);

  // Enable notifications for all events
  useNotifications(events);

  const addEvent = (eventData: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    const newEvent: CountdownEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      targetDate: new Date(eventData.targetDate) // Ensure it's a Date object
    };
    
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Convert string dates back to Date objects (from localStorage)
  const eventsWithDates = events.map(event => ({
    ...event,
    targetDate: new Date(event.targetDate),
    createdAt: new Date(event.createdAt)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Exam Countdowns</h2>
          <p className="text-muted-foreground">Track multiple exams and stay organized</p>
        </div>
        <EventForm onAddEvent={addEvent} />
      </div>

      {eventsWithDates.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No exams scheduled</h3>
          <p className="text-muted-foreground mb-4">Add your first exam to get started</p>
          <EventForm onAddEvent={addEvent} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {eventsWithDates
            .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
            .map(event => (
              <CountdownTimer
                key={event.id}
                event={event}
                onDelete={deleteEvent}
              />
            ))}
        </div>
      )}
    </div>
  );
}