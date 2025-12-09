// Global type declarations

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export {};
