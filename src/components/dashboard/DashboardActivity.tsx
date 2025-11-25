import React, { useState } from 'react';

interface Suggestion {
  category: string;
  text: string;
  timestamp: string;
}

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
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      rapport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      discovery: 'bg-green-500/20 text-green-400 border-green-500/30',
      value: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      objection: 'bg-red-500/20 text-red-400 border-red-500/30',
      closing: 'bg-purple/20 text-purple border-purple/30',
    };
    return colors[category.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (calls.length === 0) {
    return (
      <div className="bg-dark border border-white/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-white/60">Nessuna chiamata registrata questo mese</p>
        <p className="text-white/40 text-sm mt-2">Inizia a usare l'estensione Chrome per vedere le tue statistiche</p>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-white/10 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">Riepilogo Attività</h3>
        <p className="text-white/60 text-sm mt-1">Ultimi {calls.length} chiamate</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Durata</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Suggerimenti</th>
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
                        <p className="text-white/60 text-sm font-medium mb-3">Suggerimenti durante la chiamata:</p>
                        {call.suggestions.map((suggestion, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className={`px-2 py-1 rounded text-xs font-medium border capitalize ${getCategoryColor(suggestion.category)}`}>
                              {suggestion.category}
                            </span>
                            <p className="text-white/80 text-sm flex-1">{suggestion.text}</p>
                          </div>
                        ))}
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
