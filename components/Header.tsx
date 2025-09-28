import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <LogoIcon className="w-12 h-12" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 text-transparent bg-clip-text">
          TextVibe
        </h1>
      </div>
      <p className="text-lg text-stone-600 max-w-2xl mx-auto">
        Instantly generate engaging scripts, captions, and hashtags for your social media content.
      </p>
    </header>
  );
};