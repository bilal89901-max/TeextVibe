import React from 'react';
import { type VideoStyle, videoStyles, type Platform, platforms, platformDefaults } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  videoStyle: VideoStyle;
  setVideoStyle: (style: VideoStyle) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  isManualDuration: boolean;
  setIsManualDuration: (manual: boolean) => void;
  videoDuration: number;
  setVideoDuration: (duration: number) => void;
  isLoading: boolean;
  onGenerate: () => void;
  isGeneratingTopic: boolean;
  onGenerateTopic: () => void;
}

const styleIcons: Record<VideoStyle, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'AI Video': BotIcon,
  'Human Video': UserIcon,
};

const formatDuration = (seconds: number): string => {
  if (seconds <= 60) {
    return `${seconds}s`;
  }
  const minutes = seconds / 60;
  // Show one decimal place for minutes unless it's a whole number
  const formattedMinutes = minutes % 1 === 0 ? minutes : minutes.toFixed(1);
  return `${formattedMinutes}min`;
};


export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  videoStyle,
  setVideoStyle,
  platform,
  setPlatform,
  isManualDuration,
  setIsManualDuration,
  videoDuration,
  setVideoDuration,
  isLoading,
  onGenerate,
  isGeneratingTopic,
  onGenerateTopic,
}) => {
  const currentPlatformConfig = platformDefaults[platform];
  
  return (
    <div className="bg-white/70 border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-lg">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="topic" className="block text-sm font-medium text-stone-600">
            Video Topic
          </label>
          <button
            onClick={onGenerateTopic}
            disabled={isGeneratingTopic || isLoading}
            className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingTopic ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding a topic...
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" />
                Get Viral Topic
              </>
            )}
          </button>
        </div>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Click 'Get Viral Topic' or enter your own"
          className="w-full bg-stone-100 border border-stone-300 rounded-lg px-4 py-2 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
            <label htmlFor="platform" className="block text-sm font-medium text-stone-600">Platform</label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              disabled={isLoading}
              className="w-full bg-stone-100 border border-stone-300 rounded-lg px-4 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition appearance-none bg-no-repeat bg-right-3 bg-center"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2368707d' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundSize: '1.5em 1.5em' }}
            >
              {platforms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="duration" className="block text-sm font-medium text-stone-600">
              Video Length
            </label>
            <div className="flex items-center gap-2">
               <label htmlFor="manualDurationToggle" className="text-sm font-medium text-stone-600 cursor-pointer whitespace-nowrap">Customize Duration</label>
              <button
                id="manualDurationToggle"
                onClick={() => setIsManualDuration(!isManualDuration)}
                disabled={isLoading}
                role="switch"
                aria-checked={isManualDuration}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 ${
                  isManualDuration ? 'bg-amber-500' : 'bg-stone-300'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isManualDuration ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <input
              type="range"
              id="duration"
              min={currentPlatformConfig.min}
              max={currentPlatformConfig.max}
              step={currentPlatformConfig.step}
              value={videoDuration}
              onChange={(e) => setVideoDuration(Number(e.target.value))}
              disabled={!isManualDuration || isLoading}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-colors
                         disabled:[&::-webkit-slider-thumb]:bg-stone-400
                         [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-colors [&::-moz-range-thumb]:border-none
                         disabled:[&::-moz-range-thumb]:bg-stone-400"
            />
             <div className="w-24 text-center bg-stone-100 border border-stone-300 rounded-lg px-2 py-1.5">
              <span className="font-semibold text-stone-800">{formatDuration(videoDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-600">Video Style</label>
        <div className="grid grid-cols-2 gap-4">
          {videoStyles.map((style) => {
            const Icon = styleIcons[style];
            return (
              <button
                key={style}
                onClick={() => setVideoStyle(style)}
                disabled={isLoading}
                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  videoStyle === style
                    ? 'bg-amber-100/50 border-amber-500 ring-2 ring-amber-500 text-amber-800'
                    : 'bg-stone-100/50 border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-200/50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{style}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading || isGeneratingTopic}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-2xl hover:shadow-amber-500/30"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Content
            </>
          )}
        </button>
      </div>
    </div>
  );
};