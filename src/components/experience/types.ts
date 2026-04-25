export interface Stat {
  value: string;
  label: string;
}

export interface Moment {
  title: string;
  teaser: string;
  body: string;
}

export interface SkillEntry {
  name: string;
  description: string;
}

// A category can render its entries in two ways:
// - 'standard' (default): skill name + one-line description
// - 'stats': name becomes a big value, description becomes a small red label
export type SkillCategoryKind = 'standard' | 'stats';

export interface SkillCategory {
  name: string;
  kind?: SkillCategoryKind;
  entries: SkillEntry[];
}

export interface Exhibit {
  src: string;
  caption: string;
  alt: string;
}

// Org brief: structured company context rendered in the role detail page
// hero area (between hook quote and stats). Editorial data card.
export interface OrgBriefDatum {
  label: string;
  value: string;
}

export interface OrgBrief {
  tagline?: string;
  data: OrgBriefDatum[];
}

// Each detail section renders as its own block on the role detail page.
// Roles declare which sections they want, in what order, with custom content.
export type DetailSection =
  | { kind: 'moments'; title?: string; moments: Moment[] }
  | { kind: 'skills'; title?: string; categories: SkillCategory[] }
  | { kind: 'exhibits'; title?: string; items: Exhibit[] };

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

  // LEGACY: kept for roles that haven't migrated yet. Ignored when `sections` is set.
  moments?: Moment[];

  // NEW: ordered list of detail sections. Each role can mix and match.
  // If omitted, falls back to rendering `moments` as a single default section.
  sections?: DetailSection[];

  // Contextual company brief rendered in the role detail page hero area,
  // between the hook quote and the stats grid.
  orgBrief?: OrgBrief;

  // Optional inline figure that appears between story paragraphs.
  // Renders with editorial framing (label above, caption below) and breaks
  // out wider than the story column for visual weight.
  storyFigure?: {
    src: string;
    label: string;    // e.g. "FIG. 01"
    caption: string;  // e.g. "LDR AGENT — SYSTEM ARCHITECTURE"
    alt: string;
    afterParagraph: number; // 1-indexed; figure renders after this paragraph
  };
}

export interface Act {
  number: string;
  title: string;
  dateRange: string;
  experiences: Experience[];
}
