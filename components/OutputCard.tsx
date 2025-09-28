import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OutputCardProps {
  title: string;
  content: string;
  isScript?: boolean;
}

export const OutputCard: React.FC<OutputCardProps> = ({ title, content, isScript = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [content]);

  return (
    <div className="bg-white/70 border border-stone-200 rounded-2xl shadow-lg relative group transition-all duration-300 hover:border-amber-500/30 hover:shadow-amber-500/10">
       <div className="p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-transparent bg-clip-text">{title}</h3>
        <div className={`text-stone-700 whitespace-pre-wrap leading-relaxed ${isScript ? 'max-h-96 overflow-y-auto pr-4 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]' : ''}`}>
          {content}
        </div>
       </div>
       <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-stone-100 rounded-lg text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy to clipboard"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
    </div>
  );
};