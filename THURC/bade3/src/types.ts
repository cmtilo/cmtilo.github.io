export interface MediaAsset {
  id: string;
  name: string;
  originalFileName: string;
  type: 'image' | 'video';
  defaultUrl: string;
  customUrl?: string;
  description: string;
  tag: string;
}

export interface FloorLayer {
  id: string;
  floor: string;
  title: string;
  subtitle: string;
  fileName: string;
  color: string;
  accentHex: string;
  defaultUrl: string;
  zIndex: number;
  elevation: number; // in px or rem
  details: string[];
}

export interface ContactInquiry {
  name: string;
  phone: string;
  community: string;
  serviceType: string;
  notes: string;
}
