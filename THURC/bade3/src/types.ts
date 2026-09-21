export interface SlideItem {
  id: string;
  filename: string;
  title: string;
  phase: string;
  description: string;
  category: 'overview' | 'indoor' | 'jet_wash' | 'pipeline_plan' | 'completion' | 'drone';
  layerZ?: number;
  videoUrl?: string;
  videoPoster?: string;
  date?: string;
}

export interface VideoItem {
  id: string;
  src: string;
  poster: string;
  title: string;
  phase: string;
  duration: string;
  description: string;
  date?: string;
}

export interface PhaseInfo {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  summary: string;
  badge: string;
  date?: string;
  metrics: { label: string; value: string; unit?: string }[];
  highlights: string[];
}

export interface MouseEffectSettings {
  tiltEnabled: boolean;
  spotlightEnabled: boolean;
  waterTrailEnabled: boolean;
  exploded3D: boolean;
}
