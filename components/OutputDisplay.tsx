import React from 'react';
import { type GeneratedContent } from '../types';
import { OutputCard } from './OutputCard';

interface OutputDisplayProps {
  isLoading: boolean;
  content: GeneratedContent | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6">
        {/* Script Skeleton */}
        <div className="bg-white/80 border border-stone-200/50 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-stone-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
                <div className="h-3 bg-stone-200 rounded w-full"></div>
                <div className="h-3 bg-stone-200 rounded w-5/6"></div>
                <div className="h-3 bg-stone-200 rounded w-full"></div>
                <div className="h-3 bg-stone-200 rounded w-3/4"></div>
            </div>
        </div>
        {/* Caption Skeleton */}
        <div className="bg-white/80 border border-stone-200/50 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-stone-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
                <div className="h-3 bg-stone-200 rounded w-full"></div>
                <div className="h-3 bg-stone-200 rounded w-5/6"></div>
            </div>
        </div>
        {/* Hashtags Skeleton */}
        <div className="bg-white/80 border border-stone-200/50 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-stone-200 rounded w-1/4 mb-4"></div>
            <div className="h-3 bg-stone-200 rounded w-full"></div>
        </div>
    </div>
);


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, content }) => {
  if (isLoading) {
    return (
      <div className="mt-10">
        <SkeletonLoader />
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8 animate-fade-in">
      <OutputCard title="Video Script" content={content.script} isScript={true} />
      <OutputCard title="Caption" content={content.caption} />
      <OutputCard
        title="Hashtags"
        content={content.hashtags.join(' ')}
      />
    </div>
  );
};