export interface CountdownEvent {
  id: string;
  title: string;
  description?: string;
  targetDate: Date;
  color: string;
  createdAt: Date;
}

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  accent: string;
  gradient: string;
}