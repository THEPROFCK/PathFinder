// src/components/QuestionSection.tsx

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  description?: string;
}

interface QuestionSectionProps {
  question: string;
  description?: string;
  options: Option[];
  selectedValues: string[];
  onToggle: (id: string) => void;
  multiSelect?: boolean;
  allowCustom?: boolean;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  customPlaceholder?: string;
}

export default function QuestionSection({
  question,
  description,
  options,
  selectedValues,
  onToggle,
  multiSelect = true,
  allowCustom = false,
  customValue = '',
  onCustomChange,
  customPlaceholder = 'Enter your own...'
}: QuestionSectionProps) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {question}
        </h2>
        {description && (
          <p className="text-lg text-gray-400">{description}</p>
        )}
        {multiSelect && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Select all that apply</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={`group relative text-left p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                isSelected
                  ? 'bg-white/10 border-white/30 shadow-lg shadow-white/10 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Custom Checkbox */}
                <div className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                  isSelected
                    ? 'border-white bg-white'
                    : 'border-white/30 group-hover:border-white/50'
                }`}>
                  {isSelected && (
                    <svg 
                      className="w-3.5 h-3.5 text-black" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold mb-1 transition-colors ${
                    isSelected ? 'text-white' : 'text-gray-200'
                  }`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-sm transition-colors ${
                      isSelected ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {option.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                isSelected ? 'opacity-50' : ''
              }`} />
            </button>
          );
        })}
      </div>

      {allowCustom && (
        <div className="pt-4">
          {!showCustom ? (
            <button
              onClick={() => setShowCustom(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add your own</span>
            </button>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Add your own (optional)
              </label>
              <input
                type="text"
                value={customValue}
                onChange={(e) => onCustomChange?.(e.target.value)}
                placeholder={customPlaceholder}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}