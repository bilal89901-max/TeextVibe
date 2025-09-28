import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { generateVideoStrategy, generateViralTopic } from './services/geminiService';
import { type GeneratedContent, VideoType } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [videoType, setVideoType] = useState<VideoType>(VideoType.AI_Short);
  const [length, setLength] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerateTopic = useCallback(async () => {
    setIsGeneratingTopic(true);
    setError(null);
    try {
      const newTopic = await generateViralTopic();
      setTopic(newTopic);
    } catch (e) {
      console.error(e);
      setError('Failed to generate a viral topic. Please try again.');
    } finally {
      setIsGeneratingTopic(false);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter or generate a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateVideoStrategy({ topic, videoType, length });
      setGeneratedContent(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate content. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, videoType, length]);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-50 to-stone-100">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Header />
        <main>
          <InputForm
            topic={topic}
            setTopic={setTopic}
            videoType={videoType}
            setVideoType={setVideoType}
            length={length}
            setLength={setLength}
            isLoading={isLoading}
            onGenerate={handleGenerate}
            isGeneratingTopic={isGeneratingTopic}
            onGenerateTopic={handleGenerateTopic}
          />

          {error && (
            <div className="mt-8 flex items-center justify-center gap-3 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          )}
          
          <OutputDisplay isLoading={isLoading} content={generatedContent} />
        </main>
      </div>
    </div>
  );
};

export default App;