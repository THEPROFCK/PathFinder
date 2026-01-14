// src/components/ResultsDisplay.tsx

import { CareerRecommendation } from '@/types/career';
import { Briefcase, BookOpen, TrendingUp, Target, Clock, MapPin, Sparkles, RefreshCw, ExternalLink, CheckCircle2, Download, Share2, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultsDisplayProps {
  results: CareerRecommendation;
  onRestart: () => void;
}

// Helper function to generate contextual "Other Options"
function generateOtherOptions(results: CareerRecommendation) {
  const primaryTitles = results.primaryCareers.map(c => c.title.toLowerCase());
  const allOptions = [
    {
      title: 'Freelance Consulting',
      category: 'Entrepreneurship',
      description: 'Leverage your expertise to advise others while maintaining flexibility',
      icon: '💼',
      color: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      timeframe: '3-6 months',
      difficulty: 'Moderate'
    },
    {
      title: 'Content Creation',
      category: 'Digital Media',
      description: 'Build an audience by sharing knowledge in your field through videos, blogs, or podcasts',
      icon: '🎥',
      color: 'bg-gradient-to-br from-pink-500/20 to-red-500/20',
      timeframe: '6-12 months',
      difficulty: 'Moderate'
    },
    {
      title: 'Online Teaching',
      category: 'Education',
      description: 'Create courses or tutor others in your areas of expertise',
      icon: '🎓',
      color: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
      timeframe: '1-3 months',
      difficulty: 'Easy'
    },
    {
      title: 'Product Development',
      category: 'Innovation',
      description: 'Build your own digital or physical products to solve problems you understand',
      icon: '🚀',
      color: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20',
      timeframe: '6-12 months',
      difficulty: 'Challenging'
    },
    {
      title: 'Community Building',
      category: 'Social Impact',
      description: 'Start a community, newsletter, or network in your industry',
      icon: '🤝',
      color: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      timeframe: '3-6 months',
      difficulty: 'Moderate'
    },
    {
      title: 'Technical Writing',
      category: 'Communication',
      description: 'Document processes, create guides, or write about your industry',
      icon: '✍️',
      color: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
      timeframe: '1-3 months',
      difficulty: 'Easy'
    },
    {
      title: 'Affiliate Marketing',
      category: 'Digital Business',
      description: 'Promote products and services you believe in while earning commissions',
      icon: '💰',
      color: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
      timeframe: '3-6 months',
      difficulty: 'Moderate'
    },
    {
      title: 'Side Project Development',
      category: 'Innovation',
      description: 'Build apps, tools, or services that solve niche problems',
      icon: '🛠️',
      color: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      timeframe: '6-12 months',
      difficulty: 'Challenging'
    },
    {
      title: 'Career Coaching',
      category: 'Professional Services',
      description: 'Help others navigate career transitions in your field',
      icon: '🎯',
      color: 'bg-gradient-to-br from-rose-500/20 to-pink-500/20',
      timeframe: '3-6 months',
      difficulty: 'Moderate'
    }
  ];

  // Randomly select 6 options for variety
  return allOptions
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
}

export default function ResultsDisplay({ results, onRestart }: ResultsDisplayProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate shareable text summary
  const generateShareText = () => {
    const primaryCareer = results.primaryCareers[0];
    return `I just discovered my ideal career path! 🎯

Primary Career: ${primaryCareer.title}

${primaryCareer.description}

Skills needed: ${primaryCareer.requiredSkills.slice(0, 3).join(', ')}

Find your path at: ${window.location.origin}`;
  };

  // Copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share via Web Share API (mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Career Path Results',
          text: generateShareText(),
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  // Email share
  const handleEmailShare = () => {
    const subject = encodeURIComponent('My Career Path Assessment Results');
    const body = encodeURIComponent(generateShareText());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  // Download as PDF (using browser print to PDF)
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Hide buttons before printing
    const buttons = document.querySelectorAll('.no-print');
    buttons.forEach(btn => (btn as HTMLElement).style.display = 'none');
    
    window.print();
    
    // Show buttons again after print dialog
    setTimeout(() => {
      buttons.forEach(btn => (btn as HTMLElement).style.display = '');
      setIsDownloading(false);
    }, 1000);
  };

  // Download as text file
  const handleDownloadText = () => {
    const content = `
CAREER PATH ASSESSMENT RESULTS
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════════

WHY THESE CAREERS FIT YOU
${results.explanation}

═══════════════════════════════════════════════════════════════

PRIMARY CAREER RECOMMENDATIONS

${results.primaryCareers.map((career, i) => `
${i + 1}. ${career.title.toUpperCase()}

Description:
${career.description}

Why This Fits:
${career.fitReason}

Required Skills:
${career.requiredSkills.map(s => `• ${s}`).join('\n')}

Required Education:
${career.requiredEducation.map(e => `• ${e}`).join('\n')}

Tools:
${career.tools.join(', ')}

Salary Range: ${career.salaryRange}
Growth Potential: ${career.growthPotential}

Daily Routine:
Morning: ${career.dailyRoutine.morning.join(', ')}
Afternoon: ${career.dailyRoutine.afternoon.join(', ')}
Evening: ${career.dailyRoutine.evening.join(', ')}

`).join('\n')}

═══════════════════════════════════════════════════════════════

ACTION PLAN

Next 90 Days:
${results.actionPlan.next90Days.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Next 6 Months:
${results.actionPlan.next6Months.map((item, i) => `${i + 1}. ${item}`).join('\n')}

═══════════════════════════════════════════════════════════════

POSITIONING STRATEGY

Local Jobs:
${results.positioningStrategy.localJobs.map(item => `• ${item}`).join('\n')}

Remote Jobs:
${results.positioningStrategy.remoteJobs.map(item => `• ${item}`).join('\n')}

Portfolio & Proof:
${results.positioningStrategy.portfolio.map(item => `• ${item}`).join('\n')}

Online Presence:
${results.positioningStrategy.onlinePresence.map(item => `• ${item}`).join('\n')}

═══════════════════════════════════════════════════════════════

Generated by CareerPath AI - ${window.location.origin}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-path-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">PathFinder</h1>
                  <p className="text-sm text-gray-400">Your personalized results</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 no-print">
                {/* Download Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-blue-500/30 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden md:inline">{isDownloading ? 'Preparing...' : 'Download PDF'}</span>
                  </button>
                </div>

                {/* Text Download Button */}
                <button
                  onClick={handleDownloadText}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl"
                  title="Download as text file"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">TXT</span>
                </button>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden md:inline">Share</span>
                  </button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            handleCopyLink();
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all text-left"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <div>
                                <div className="font-medium">Copy Summary</div>
                                <div className="text-xs text-gray-400">Copy to clipboard</div>
                              </div>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            handleEmailShare();
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all text-left"
                        >
                          <Mail className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-xs text-gray-400">Send via email</div>
                          </div>
                        </button>

                        {typeof navigator.share === 'function' && (
                          <button
                            onClick={() => {
                              handleNativeShare();
                              setShowShareMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all text-left"
                          >
                            <Share2 className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Share</div>
                              <div className="text-xs text-gray-400">More options</div>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={onRestart}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden md:inline">Start Over</span>
                </button>
              </div>
            </div>

            {/* Explanation Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Why These Careers Fit You
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{results.explanation}</p>
            </div>
          </div>

          {/* Primary Careers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Primary Career Paths
            </h2>

            <div className="space-y-6">
              {results.primaryCareers.map((career, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {career.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">{career.description}</p>
                    </div>
                  </div>

                  {/* Fit Reason */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-300 mb-2">Perfect Match</h4>
                        <p className="text-green-200/80">{career.fitReason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">Salary Range</span>
                      </div>
                      <p className="text-white font-semibold">{career.salaryRange}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-400">Growth Potential</span>
                      </div>
                      <p className="text-white font-semibold">{career.growthPotential}</p>
                    </div>
                  </div>

                  {/* Skills & Education */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Education & Tools</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Education</p>
                          <div className="flex flex-wrap gap-2">
                            {career.requiredEducation.map((edu, i) => (
                              <span key={i} className="text-sm text-gray-300">{edu}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Tools</p>
                          <p className="text-sm text-gray-300">{career.tools.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Routine */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      Your Typical Day
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-xs font-bold text-amber-400 uppercase mb-3">Morning</p>
                        <ul className="space-y-2">
                          {career.dailyRoutine.morning.map((item, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-400 uppercase mb-3">Afternoon</p>
                        <ul className="space-y-2">
                          {career.dailyRoutine.afternoon.map((item, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                        <p className="text-xs font-bold text-purple-400 uppercase mb-3">Evening</p>
                        <ul className="space-y-2">
                          {career.dailyRoutine.evening.map((item, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Careers */}
          {results.alternativeCareers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Alternative Paths Worth Exploring
              </h2>
              <p className="text-gray-400 mb-8">These careers also align with your profile and could be great options</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {results.alternativeCareers.map((career, index) => (
                  <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{career.title}</h3>
                      <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                        Alternative
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">{career.description}</p>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
                      <p className="text-amber-200 text-sm">{career.fitReason}</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500 font-medium">Key Skills:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {career.requiredSkills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300 text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div>
                          <span className="text-gray-500 text-xs">Salary Range</span>
                          <p className="text-white font-semibold">{career.salaryRange}</p>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Options to Consider */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              Other Options to Consider
            </h2>
            <p className="text-gray-400 mb-8">Based on your profile, you might also explore these areas</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {generateOtherOptions(results).map((option, index) => (
                <div key={index} className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:from-white/10 hover:to-white/5 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${option.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                      <p className="text-xs text-gray-400">{option.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{option.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                      {option.timeframe}
                    </span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                      {option.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  💡
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Pro Tip: Don't limit yourself</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Modern careers are fluid and multidisciplinary. Many successful professionals combine skills from multiple areas. 
                    Consider how you could blend your primary career with side projects, freelancing, or entrepreneurship in these alternative fields.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              Your Action Plan
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold">
                    Next 90 Days
                  </div>
                </div>
                <ul className="space-y-3">
                  {results.actionPlan.next90Days.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-400">{i + 1}</span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold">
                    Next 6 Months
                  </div>
                </div>
                <ul className="space-y-3">
                  {results.actionPlan.next6Months.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-400">{i + 1}</span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Positioning Strategy */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              How to Position Yourself
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {results.positioningStrategy.localJobs.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    Local Opportunities
                  </h3>
                  <ul className="space-y-2">
                    {results.positioningStrategy.localJobs.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.positioningStrategy.remoteJobs.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    Remote Work
                  </h3>
                  <ul className="space-y-2">
                    {results.positioningStrategy.remoteJobs.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.positioningStrategy.portfolio.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    Portfolio & Proof
                  </h3>
                  <ul className="space-y-2">
                    {results.positioningStrategy.portfolio.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.positioningStrategy.onlinePresence.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    Online Presence
                  </h3>
                  <ul className="space-y-2">
                    {results.positioningStrategy.onlinePresence.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-pink-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center no-print space-y-6">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-3">Save Your Career Plan</h3>
              <p className="text-gray-400 mb-6">Download your personalized results to reference anytime</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  <Download className="w-5 h-5" />
                  Download as PDF
                </button>
                <button
                  onClick={handleDownloadText}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 font-semibold transition-all duration-300 backdrop-blur-xl"
                >
                  <Download className="w-5 h-5" />
                  Download as Text
                </button>
              </div>
            </div>

            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
