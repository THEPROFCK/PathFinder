// src/components/CareerQuestionnaire.tsx

'use client';

import { useState } from 'react';
import { UserResponses, CareerRecommendation } from '@/types/career';
import ProgressBar from './ProgressBar';
import QuestionSection from './QuestionSection';
import ResultsDisplay from './ResultsDisplay';
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

const THINKING_STYLES = [
  { id: 'logical', label: 'Logical & Structured', description: 'Engineering, accounting, analysis' },
  { id: 'creative', label: 'Creative & Expressive', description: 'Design, writing, media' },
  { id: 'people-focused', label: 'People-Focused', description: 'Teaching, sales, counseling' },
  { id: 'hands-on', label: 'Hands-on & Practical', description: 'Mechanical work, construction, lab work' },
  { id: 'strategic', label: 'Strategic & Planning-Oriented', description: 'Management, research, operations' },
  { id: 'independent', label: 'Independent & Self-Directed', description: 'Freelancing, entrepreneurship' },
];

const INTEREST_AREAS = [
  { id: 'tech', label: 'Technology & Digital Tools', description: 'Software, IT, data, AI' },
  { id: 'business', label: 'Business & Entrepreneurship', description: 'Management, finance, sales' },
  { id: 'creative', label: 'Creative & Media', description: 'Design, film, music, content' },
  { id: 'health', label: 'Health & Life Sciences', description: 'Medicine, nursing, public health, biotech' },
  { id: 'education', label: 'Education & Training', description: 'Teaching, instructional design' },
  { id: 'sports', label: 'Sports & Physical Performance', description: 'Analysis, coaching, fitness' },
  { id: 'law', label: 'Law, Policy & Governance', description: 'Legal work, policy analysis' },
  { id: 'engineering', label: 'Engineering & Manufacturing', description: 'All engineering fields' },
  { id: 'agriculture', label: 'Agriculture & Environmental', description: 'Farming, sustainability, conservation' },
  { id: 'trades', label: 'Skilled Trades & Technical Crafts', description: 'Electrical, plumbing, carpentry' },
  { id: 'social-impact', label: 'Social Impact & Non-Profits', description: 'Community work, NGOs' },
  { id: 'research', label: 'Research & Academia', description: 'Scientific research, teaching' },
];

const SKILLS = [
  { id: 'coding', label: 'Programming & Coding', description: 'Python, JavaScript, etc.' },
  { id: 'data', label: 'Data Analysis', description: 'Excel, SQL, statistics' },
  { id: 'design', label: 'Design', description: 'Graphic, UI/UX, product' },
  { id: 'writing', label: 'Writing & Communication', description: 'Content, copywriting, technical' },
  { id: 'video', label: 'Video & Media Production', description: 'Editing, filming, animation' },
  { id: 'marketing', label: 'Marketing & Sales', description: 'Digital marketing, SEO, sales' },
  { id: 'finance', label: 'Finance & Accounting', description: 'Bookkeeping, analysis, planning' },
  { id: 'leadership', label: 'Leadership & Management', description: 'Team management, coordination' },
  { id: 'technical', label: 'Technical & Mechanical', description: 'Repair, machinery, tools' },
  { id: 'research', label: 'Research & Analysis', description: 'Investigation, critical thinking' },
];

const WORK_ENVIRONMENTS = [
  { id: 'remote', label: 'Remote / Global Work', description: '' },
  { id: 'office', label: 'Office-Based', description: '' },
  { id: 'field', label: 'Field-Based', description: '' },
  { id: 'shift', label: 'Shift Work', description: '' },
  { id: 'freelance', label: 'Freelance / Contract', description: '' },
  { id: 'entrepreneurial', label: 'Entrepreneurial', description: '' },
  { id: 'stable', label: 'Stable Employment', description: '' },
  { id: 'high-growth', label: 'High-Growth / High-Risk', description: '' },
];

const PRIORITIES = [
  { id: 'income', label: 'Income Growth', description: '' },
  { id: 'stability', label: 'Stability', description: '' },
  { id: 'flexibility', label: 'Flexibility', description: '' },
  { id: 'impact', label: 'Impact', description: '' },
  { id: 'prestige', label: 'Prestige', description: '' },
  { id: 'balance', label: 'Work-Life Balance', description: '' },
];

export default function CareerQuestionnaire() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CareerRecommendation | null>(null);
  const [responses, setResponses] = useState<UserResponses>({
    thinkingStyles: [],
    interests: [],
    skills: [],
    hasUniversity: false,
    educationUse: '',
    workEnvironments: [],
    priorities: [],
    willingToRetrain: true,
  });

  const totalSteps = 6;

  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter(v => v !== value)
      : [...array, value];
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show specific error message from API
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      setResults(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Error:', error);

      // Show more specific error messages
      let errorMessage = 'Failed to generate career recommendations. Please try again.';

      if (error.message.includes('API key not configured')) {
        errorMessage = 'API key not configured. Please add OPENROUTER_API_KEY to your .env.local file.';
      } else if (error.message.includes('Invalid API key')) {
        errorMessage = 'Invalid API key. Please check your OPENROUTER_API_KEY in .env.local.';
      } else if (error.message.includes('Insufficient credits')) {
        errorMessage = 'Insufficient credits. Please add credits to your OpenRouter account.';
      } else if (error.message.includes('Rate limit exceeded')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.message.includes('Failed to parse')) {
        errorMessage = 'AI response parsing error. Please try again.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setResults(null);
    setResponses({
      thinkingStyles: [],
      interests: [],
      skills: [],
      hasUniversity: false,
      educationUse: '',
      workEnvironments: [],
      priorities: [],
      willingToRetrain: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (results) {
    return <ResultsDisplay results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PathFinder</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <ProgressBar currentStep={step} totalSteps={totalSteps} />

            {step === 1 && (
              <QuestionSection
                question="How do you naturally prefer to work or solve problems?"
                description="Select all that describe you"
                options={THINKING_STYLES}
                selectedValues={responses.thinkingStyles}
                onToggle={(id) => setResponses(prev => ({
                  ...prev,
                  thinkingStyles: toggleArrayValue(prev.thinkingStyles, id)
                }))}
                allowCustom
                customValue={responses.customThinkingStyle}
                onCustomChange={(value) => setResponses(prev => ({
                  ...prev,
                  customThinkingStyle: value
                }))}
                customPlaceholder="Describe your work style..."
              />
            )}

            {step === 2 && (
              <QuestionSection
                question="What areas interest you?"
                description="Select as many as you like - multiple interests are valuable!"
                options={INTEREST_AREAS}
                selectedValues={responses.interests}
                onToggle={(id) => setResponses(prev => ({
                  ...prev,
                  interests: toggleArrayValue(prev.interests, id)
                }))}
                allowCustom
                customValue={responses.customInterest}
                onCustomChange={(value) => setResponses(prev => ({
                  ...prev,
                  customInterest: value
                }))}
                customPlaceholder="Add your own interest area..."
              />
            )}

            {step === 3 && (
              <QuestionSection
                question="What skills or experience do you have?"
                description="Include anything you've done, even if informally"
                options={SKILLS}
                selectedValues={responses.skills}
                onToggle={(id) => setResponses(prev => ({
                  ...prev,
                  skills: toggleArrayValue(prev.skills, id)
                }))}
                allowCustom
                customValue={responses.customSkills}
                onCustomChange={(value) => setResponses(prev => ({
                  ...prev,
                  customSkills: value
                }))}
                customPlaceholder="List any other skills or experience..."
              />
            )}

            {step === 4 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Education & Training</h2>
                  <p className="text-lg text-gray-400">Your education informs recommendations but doesn&apos;t limit possibilities</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Have you attended university?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ].map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setResponses(prev => ({ ...prev, hasUniversity: option.value }))}
                        className={`flex-1 px-6 py-4 rounded-xl border backdrop-blur-xl font-semibold transition-all duration-300 ${
                          responses.hasUniversity === option.value
                            ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {responses.hasUniversity && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-400">
                      What did you study?
                    </label>
                    <input
                      type="text"
                      value={responses.degrees || ''}
                      onChange={(e) => setResponses(prev => ({ ...prev, degrees: e.target.value }))}
                      placeholder="e.g., Computer Science, Business Administration, Biology..."
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Any certifications, diplomas, or trade training?
                  </label>
                  <input
                    type="text"
                    value={responses.certifications || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, certifications: e.target.value }))}
                    placeholder="e.g., PMP, CPA, Welding Certificate, Google Analytics..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    How do you want to use your education?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'central', label: 'Central to my career' },
                      { value: 'supportive', label: 'Supportive but not required' },
                      { value: 'backup', label: 'Backup option' },
                      { value: 'not-relevant', label: 'Not relevant / Pivoting away' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setResponses(prev => ({ ...prev, educationUse: option.value as UserResponses['educationUse'] }))}
                        className={`w-full text-left px-5 py-4 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
                          responses.educationUse === option.value
                            ? 'bg-white/10 border-white/30 shadow-lg'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="font-medium text-white">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-10 animate-fadeIn">
                <QuestionSection
                  question="What work environments appeal to you?"
                  options={WORK_ENVIRONMENTS}
                  selectedValues={responses.workEnvironments}
                  onToggle={(id) => setResponses(prev => ({
                    ...prev,
                    workEnvironments: toggleArrayValue(prev.workEnvironments, id)
                  }))}
                />

                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <QuestionSection
                  question="What matters most to you right now?"
                  options={PRIORITIES}
                  selectedValues={responses.priorities}
                  onToggle={(id) => setResponses(prev => ({
                    ...prev,
                    priorities: toggleArrayValue(prev.priorities, id)
                  }))}
                  allowCustom
                  customValue={responses.customPriority}
                  onCustomChange={(value) => setResponses(prev => ({
                    ...prev,
                    customPriority: value
                  }))}
                  customPlaceholder="Any other priorities..."
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Final Details</h2>
                  <p className="text-lg text-gray-400">Help us personalize your recommendations</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Your location (city, country)
                  </label>
                  <input
                    type="text"
                    value={responses.location || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Lagos, Nigeria"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    How many hours per week can you dedicate to learning?
                  </label>
                  <input
                    type="text"
                    value={responses.learningHours || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, learningHours: e.target.value }))}
                    placeholder="e.g., 10-15 hours, Full-time, Weekends only..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Any financial constraints?
                  </label>
                  <textarea
                    value={responses.financialConstraints || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, financialConstraints: e.target.value }))}
                    placeholder="e.g., Need to earn while learning, Can invest in courses..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Are you willing to retrain or learn new skills?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ].map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setResponses(prev => ({ ...prev, willingToRetrain: option.value }))}
                        className={`flex-1 px-6 py-4 rounded-xl border backdrop-blur-xl font-semibold transition-all duration-300 ${
                          responses.willingToRetrain === option.value
                            ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Any other considerations?
                  </label>
                  <textarea
                    value={responses.otherConstraints || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, otherConstraints: e.target.value }))}
                    placeholder="Family obligations, health considerations, location restrictions..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 backdrop-blur-xl resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl hover:bg-gray-100 font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 ml-auto"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/50 ml-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Your Profile...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Get My Career Path</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}