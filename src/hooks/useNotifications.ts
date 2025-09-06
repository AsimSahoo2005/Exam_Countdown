import { useEffect, useRef } from 'react';
import { CountdownEvent } from '@/types/event';

export function useNotifications(events: CountdownEvent[]) {
  const notifiedEvents = useRef(new Set<string>());

  useEffect(() => {
    const requestPermission = async () => {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      
      events.forEach(event => {
        const timeLeft = event.targetDate.getTime() - now.getTime();
        const hours = timeLeft / (1000 * 60 * 60);
        const eventKey = event.id;

        // 1 day notification
        if (hours <= 24 && hours > 23.9 && !notifiedEvents.current.has(`${eventKey}-1day`)) {
          showNotification(`${event.title} - 1 Day Remaining!`, 'Your exam is tomorrow');
          notifiedEvents.current.add(`${eventKey}-1day`);
        }

        // 1 hour notification
        if (hours <= 1 && hours > 0.98 && !notifiedEvents.current.has(`${eventKey}-1hour`)) {
          showNotification(`${event.title} - 1 Hour Remaining!`, 'Your exam starts in 1 hour');
          notifiedEvents.current.add(`${eventKey}-1hour`);
        }

        // Exam started
        if (timeLeft <= 0 && !notifiedEvents.current.has(`${eventKey}-started`)) {
          showNotification(`${event.title} Started!`, 'Your exam has begun. Good luck!');
          playNotificationSound();
          notifiedEvents.current.add(`${eventKey}-started`);
        }
      });
    };

    const interval = setInterval(checkNotifications, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [events]);

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'exam-countdown'
      });
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };
}