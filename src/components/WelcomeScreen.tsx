// src/components/WelcomeScreen.tsx

import { ArrowRight, Sparkles, Target, Zap, Globe, Users, TrendingUp, Award, Check, MessageSquare, FileText, Lightbulb } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PathFinder</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto mb-16">

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Discover Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Stop guessing. Get personalized career recommendations across all industries tech, creative, trades, services, and more. No bias. No limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] shadow-lg"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>5-7 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>No login required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>100% private</span>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400 text-lg">Get your personalized career roadmap in 3 simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                      <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Answer Questions</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Tell us about your interests, skills, work style, and goals through our thoughtful questionnaire
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
              </div>

              {/* Step 2 */}
              <div className="relative animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <Lightbulb className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Analyzes</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our advanced AI matches your profile with careers across all industries—no bias, just perfect fits
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-pink-500/50 to-orange-500/50" />
              </div>

              {/* Step 3 */}
              <div className="relative animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Get Your Roadmap</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Receive detailed career paths, action plans, and strategies—download and start your journey today
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">All Industries Covered</h3>
                <p className="text-gray-400 leading-relaxed">From tech and creative fields to trades, healthcare, and business. We don't push you toward one path.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
                <p className="text-gray-400 leading-relaxed">Advanced AI analyzes your unique profile interests, skills, and goals to find careers that truly fit you.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/50 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Actionable Roadmaps</h3>
                <p className="text-gray-400 leading-relaxed">Get detailed 90 day and 6 month action plans, plus strategies for jobs, internships, and freelancing.</p>
              </div>
            </div>
          </div>

          {/* What You'll Get Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              What You'll Discover
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Briefcase, title: '1-3 Primary Career Paths', desc: 'Personalized recommendations based on your unique profile' },
                { icon: TrendingUp, title: 'Growth & Salary Insights', desc: 'Real market data for your location and remote opportunities' },
                { icon: Users, title: 'Daily & Weekly Routines', desc: 'See what your day to day would actually look like' },
                { icon: Award, title: 'Skills & Education Needs', desc: 'Clear requirements and learning paths for each career' },
                { icon: Target, title: '90-Day Action Plan', desc: 'Concrete steps to start your career transition today' },
                { icon: Globe, title: 'Positioning Strategies', desc: 'How to land jobs, internships, or start freelancing' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${0.9 + i * 0.1}s` }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">12+</div>
                <div className="text-sm text-gray-500">Industries Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">50+</div>
                <div className="text-sm text-gray-500">Career Paths</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">5-7</div>
                <div className="text-sm text-gray-500">Minutes to Complete</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center animate-fadeIn" style={{ animationDelay: '1.6s' }}>
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to find your path?</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">Join thousands discovering careers they love. Start your personalized assessment now.</p>
              <button
                onClick={onStart}
                className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div>© 2026 PathFinder. All rights reserved.</div>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Import Briefcase at top
import { Briefcase } from 'lucide-react';