import React from 'react';

interface CategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
}

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      rapport: 'from-blue-500 to-cyan-500',
      discovery: 'from-green-500 to-emerald-500',
      value: 'from-yellow-500 to-orange-500',
      objection: 'from-red-500 to-pink-500',
      closing: 'from-purple to-blue',
    };
    return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Time Card */}
      <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-purple/50 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-white/60 text-sm">Tempo Utilizzato</span>
        </div>
        <p className="text-3xl font-bold text-white">{formatTime(totalMinutes)}</p>
        <p className="text-white/40 text-xs mt-1">questo mese</p>
      </div>

      {/* Suggestions Card */}
      <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-blue/50 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-white/60 text-sm">Suggerimenti</span>
        </div>
        <p className="text-3xl font-bold text-white">{totalSuggestions}</p>
        <p className="text-white/40 text-xs mt-1">generati questo mese</p>
      </div>

      {/* Category Breakdown Card */}
      <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-green-500/50 transition-colors">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-white/60 text-sm">Per Categoria</span>
        </div>
        <div className="space-y-2">
          {categoryBreakdown.slice(0, 3).map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <span className="text-white text-sm capitalize">{item.category}</span>
              <span className="text-white/60 text-sm">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
