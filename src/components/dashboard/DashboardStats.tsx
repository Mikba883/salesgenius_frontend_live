import React from 'react';

interface CategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
}

const categoryConfig: Record<string, { emoji: string; color: string }> = {
  rapport: { emoji: '🤝', color: '#38bdf8' },
  discovery: { emoji: '🧭', color: '#a78bfa' },
  value: { emoji: '💎', color: '#34d399' },
  objection: { emoji: '⚖️', color: '#fb923c' },
  closing: { emoji: '✅', color: '#facc15' },
};

interface DashboardStatsProps {
  totalMinutes: number;
  totalSuggestions: number;
  categoryBreakdown: CategoryBreakdown[];
}

const DashboardStats = ({ totalMinutes, totalSuggestions, categoryBreakdown }: DashboardStatsProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Time Used */}
      <div className="bg-dark border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/60 text-sm font-medium">Time Used</h3>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-white">{formatTime(totalMinutes)}</p>
        <p className="text-white/40 text-sm mt-2">This month</p>
      </div>

      {/* Suggestions */}
      <div className="bg-dark border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/60 text-sm font-medium">Suggestions</h3>
          <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-white">{totalSuggestions}</p>
        <p className="text-white/40 text-sm mt-2">Total</p>
      </div>

      {/* By Category */}
      <div className="bg-dark border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/60 text-sm font-medium">By Category</h3>
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          {categoryBreakdown.slice(0, 3).map((item) => {
            const config = categoryConfig[item.category.toLowerCase()];
            return (
              <div key={item.category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80 text-sm capitalize flex items-center gap-2">
                    {config && <span>{config.emoji}</span>}
                    {item.category}
                  </span>
                  <span className="text-white font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: config?.color || '#a78bfa'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
