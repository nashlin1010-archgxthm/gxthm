export interface MemoryPhoto {
  id: string;
  category: 'first-meet' | 'second-meet' | 'scrapbook' | 'reminder';
  imageUrl: string;
  caption: string;
  timestamp: number;
  label?: string;
  reminderKey?: string;
}

export interface ReminderItem {
  id: string;
  iconName: string;
  exactSnippet: string;
  subtitle: string;
  defaultLabel: string;
}

export interface ScrapbookCategory {
  id: string;
  label: string;
  description?: string;
}
