export interface Stat {
  value: string;
  label: string;
}

export interface Moment {
  title: string;
  teaser: string;
  body: string;
}

export type PageVariant = 'kinetic' | 'narrative' | 'system' | 'creative';

export interface Experience {
  index: string;
  company: string;
  role: string;
  year: string;
  stat: string;
  descriptor: string;
  hook: string;
  story: string[];
  stats: Stat[];
  skills: string[];
  pageVariant: PageVariant;
  moments: Moment[];
}

export interface Act {
  number: string;
  title: string;
  dateRange: string;
  experiences: Experience[];
}
