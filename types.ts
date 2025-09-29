export const videoStyles = ['AI Video', 'Human Video'] as const;
export const platforms = ['TikTok', 'YouTube Shorts', 'YouTube Video', 'Instagram Reels', 'Facebook Reels', 'Facebook Video', 'Twitter (X)', 'LinkedIn', 'Pinterest', 'Threads', 'Other'] as const;

export type VideoStyle = (typeof videoStyles)[number];
export type Platform = (typeof platforms)[number];

export interface PlatformConfig {
  duration: number;
  min: number;
  max: number;
  step: number;
}

export const platformDefaults: Record<Platform, PlatformConfig> = {
  'TikTok': { duration: 60, min: 5, max: 600, step: 5 },
  'YouTube Shorts': { duration: 60, min: 5, max: 60, step: 1 },
  'YouTube Video': { duration: 180, min: 30, max: 3600, step: 60 },
  'Instagram Reels': { duration: 90, min: 5, max: 90, step: 5 },
  'Facebook Reels': { duration: 90, min: 5, max: 600, step: 15 },
  'Facebook Video': { duration: 180, min: 30, max: 3600, step: 60 },
  'Twitter (X)': { duration: 140, min: 5, max: 140, step: 5 },
  'LinkedIn': { duration: 300, min: 15, max: 600, step: 15 },
  'Pinterest': { duration: 60, min: 5, max: 900, step: 15 },
  'Threads': { duration: 90, min: 5, max: 300, step: 5 },
  'Other': { duration: 60, min: 5, max: 3600, step: 60 },
};

export interface GenerationParams {
  topic: string;
  videoStyle: VideoStyle;
  platform: Platform;
  videoDuration: number;
}

export interface GeneratedContent {
  script: string;
  caption: string;
  hashtags: string[];
}