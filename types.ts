export enum VideoType {
  AI = 'AI Video',
  Human = 'Human Video',
  AI_Short = 'AI Short Video',
  Human_Short = 'Human Short Video',
}

export interface GenerationParams {
  topic: string;
  videoType: VideoType;
  length: number;
}

export interface GeneratedContent {
  script: string;
  caption: string;
  hashtags: string[];
}