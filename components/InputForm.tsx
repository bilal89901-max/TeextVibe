import React from 'react';
import { VideoType } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  videoType: VideoType;
  setVideoType: (type: VideoType) => void;
  length: number;
  setLength: (length: number) => void;
  isLoading: boolean;
  onGenerate: () => void;
  isGeneratingTopic: boolean;
  onGenerateTopic: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  videoType,
  setVideoType,
  length,
  setLength,
  isLoading,
  onGenerate,
  isGeneratingTopic,
  onGenerateTopic,
}) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">Video Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.values(VideoType)).map((type) => (
              <button
                key={type}
                onClick={() => setVideoType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  videoType === type
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-stone-200 hover:bg-stone-300/70 text-stone-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="length" className="block text-sm font-medium text-stone-600">
            Video Length ({length} min)
          </label>
          <input
            type="range"
            id="length"
            min="1"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
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