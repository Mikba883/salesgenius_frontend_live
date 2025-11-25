import React, { useState } from 'react';

interface Suggestion {
  category: string;
  text: string;
  timestamp: string;
}

const categoryConfig: Record<string, { emoji: string; color: string }> = {
  rapport: { emoji: '🤝', color: '#38bdf8' },
  discovery: { emoji: '🧭', color: '#a78bfa' },
  value: { emoji: '💎', color: '#34d399' },
  objection: { emoji: '⚖️', color: '#fb923c' },
  closing: { emoji: '✅', color: '#facc15' },
};

interface Call {
  meetingId: string;
  date: string;
  duration: number;
  suggestionsCount: number;
  suggestions: Suggestion[];
}

interface DashboardActivityProps {
  calls: Call[];
}

const DashboardActivity = ({ calls }: DashboardActivityProps) => {
  const [expandedCall, setExpandedCall] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (calls.length === 0) {
    return (
      <div className="bg-dark border border-white/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-white/60">No calls recorded this month</p>
        <p className="text-white/40 text-sm mt-2">Start using the Chrome extension to see your stats</p>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-white/10 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">Activity Summary</h3>
        <p className="text-white/60 text-sm mt-1">Last {calls.length} calls</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Suggestions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <React.Fragment key={call.meetingId}>
                <tr 
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => setExpandedCall(expandedCall === call.meetingId ? null : call.meetingId)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatDate(call.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                    {call.duration}m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                    {call.suggestionsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-purple hover:text-purple/80 transition-colors">
                      {expandedCall === call.meetingId ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
                
                {expandedCall === call.meetingId && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 bg-white/[0.02]">
                      <div className="space-y-3">
                        <p className="text-white/60 text-sm font-medium mb-3">Suggestions during call:</p>
                        {call.suggestions.map((suggestion, idx) => {
                          const config = categoryConfig[suggestion.category.toLowerCase()];
                          return (
                            <div key={idx} className="flex gap-3 items-start">
                              <span 
                                className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 capitalize flex items-center gap-1.5"
                                style={{
                                  backgroundColor: `${config?.color}20` || '#a78bfa20',
                                  borderColor: `${config?.color}30` || '#a78bfa30',
                                  color: config?.color || '#a78bfa'
                                }}
                              >
                                {config && <span className="text-base">{config.emoji}</span>}
                                {suggestion.category}
                              </span>
                              <p className="text-white/80 text-sm flex-1">{suggestion.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardActivity;
