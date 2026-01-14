// src/components/ProgressBar.tsx

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-12">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-6">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : isCurrent
                      ? 'bg-white text-black shadow-lg shadow-white/50 scale-110'
                      : 'bg-white/5 text-gray-500 border border-white/10'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${
                  isCurrent ? 'text-white font-medium' : 'text-gray-500'
                }`}>
                  Step {stepNumber}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="flex-1 h-[2px] mx-2 relative">
                  <div className="absolute inset-0 bg-white/10" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ${
                      isCompleted ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-lg shadow-blue-500/50"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm font-medium text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-white">
            {Math.round(percentage)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}