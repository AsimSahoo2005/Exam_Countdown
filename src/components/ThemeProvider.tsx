import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ThemeOption } from '@/types/event';

const themes: ThemeOption[] = [
  {
    id: 'blue-green',
    name: 'Ocean',
    primary: '210 85% 35%',
    accent: '160 75% 45%',
    gradient: 'linear-gradient(135deg, hsl(210 85% 35%) 0%, hsl(160 75% 45%) 100%)'
  },
  {
    id: 'purple-pink',
    name: 'Sunset',
    primary: '270 85% 35%',
    accent: '320 75% 45%',
    gradient: 'linear-gradient(135deg, hsl(270 85% 35%) 0%, hsl(320 75% 45%) 100%)'
  },
  {
    id: 'orange-red',
    name: 'Fire',
    primary: '25 85% 35%',
    accent: '5 75% 45%',
    gradient: 'linear-gradient(135deg, hsl(25 85% 35%) 0%, hsl(5 75% 45%) 100%)'
  }
];

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  themes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);
  const [currentTheme, setCurrentTheme] = useLocalStorage('theme', themes[0]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply theme colors
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--accent', currentTheme.accent);
    root.style.setProperty('--gradient-primary', currentTheme.gradient);
  }, [isDark, currentTheme]);

  const toggleDark = () => setIsDark(!isDark);
  const setTheme = (theme: ThemeOption) => setCurrentTheme(theme);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}