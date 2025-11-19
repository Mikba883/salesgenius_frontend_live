import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const isConfigError = error.message.includes('Supabase configuration error');

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-dark-2/20 border border-purple/20 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-pink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">
                {isConfigError ? 'Configuration Error' : 'Something went wrong'}
              </h1>
              <p className="text-dark-3 mb-4">
                {isConfigError
                  ? 'The application is missing required environment variables.'
                  : 'An unexpected error occurred while loading the application.'}
              </p>
              
              {isConfigError && (
                <div className="bg-dark/50 rounded p-4 mb-4">
                  <p className="text-sm text-dark-3 mb-2">
                    <strong className="text-white">For developers:</strong>
                  </p>
                  <p className="text-sm text-dark-3 mb-2">
                    Please configure the following environment variables in your deployment settings:
                  </p>
                  <ul className="list-disc list-inside text-sm text-dark-3 space-y-1">
                    <li><code className="text-purple-light">VITE_SUPABASE_URL</code></li>
                    <li><code className="text-purple-light">VITE_SUPABASE_PUBLISHABLE_KEY</code></li>
                  </ul>
                </div>
              )}

              <details className="mt-4">
                <summary className="text-sm text-purple cursor-pointer hover:text-purple-light">
                  Technical details
                </summary>
                <pre className="mt-2 text-xs text-dark-3 bg-dark/50 p-3 rounded overflow-x-auto">
                  {error.message}
                </pre>
              </details>

              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple hover:bg-purple-dark text-white rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
