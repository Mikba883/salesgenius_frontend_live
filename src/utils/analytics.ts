// Analytics helper per garantire invio eventi anche se gtag/fbq non sono ancora caricati

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackGA4Event = (eventName: string, params: Record<string, any> = {}) => {
  console.log(`[GA4] Attempting to send event: ${eventName}`, params);
  
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, { ...params, transport_type: 'beacon' });
    console.log(`[GA4] ✅ Event sent via gtag: ${eventName}`);
  } else {
    console.warn(`[GA4] ⚠️ gtag not available, queuing to dataLayer: ${eventName}`);
  }
  
  // Always push to dataLayer as backup for GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params
  });
  console.log(`[GA4] 📦 Event pushed to dataLayer: ${eventName}`);
};

export const trackFBEvent = (eventName: string, params: Record<string, any> = {}) => {
  console.log(`[FB] Attempting to send event: ${eventName}`, params);
  
  if (typeof window.fbq !== 'undefined') {
    const fbq = window.fbq as any;
    
    // Verifica che fbq sia la funzione originale di Meta
    if (fbq.callMethod || Array.isArray(fbq.queue)) {
      window.fbq('track', eventName, params);
      console.log(`[FB] ✅ Event sent via REAL Meta fbq: ${eventName}`);
    } else {
      console.warn(`[FB] ⚠️ fbq exists but missing callMethod/queue - may be overwritten`);
      window.fbq('track', eventName, params);
      console.log(`[FB] ⚠️ Event sent via potentially stubbed fbq: ${eventName}`);
    }
  } else {
    console.warn(`[FB] ❌ fbq not available: ${eventName}`);
  }
};

// Diagnostic function to check Meta Pixel state
export const diagnoseFBPixel = () => {
  console.group('[FB Pixel Diagnostics]');
  console.log('fbq exists:', typeof window.fbq !== 'undefined');
  console.log('fbq type:', typeof window.fbq);
  
  if (window.fbq) {
    const fbq = window.fbq as any;
    console.log('fbq.callMethod exists:', !!fbq.callMethod);
    console.log('fbq.queue exists:', Array.isArray(fbq.queue));
    console.log('fbq.queue length:', fbq.queue?.length || 0);
    console.log('fbq.loaded:', fbq.loaded);
    console.log('fbq.version:', fbq.version);
    console.log('fbq.getState available:', typeof fbq.getState === 'function');
    if (typeof fbq.getState === 'function') {
      console.log('fbq.getState():', fbq.getState());
    }
  }
  console.groupEnd();
};

// Combined tracking for both platforms
export const trackConversion = (
  ga4EventName: string, 
  fbEventName: string, 
  params: Record<string, any> = {}
) => {
  trackGA4Event(ga4EventName, params);
  trackFBEvent(fbEventName, params);
};

// Track FB event only once per unique key (stored in localStorage)
export const trackFBEventOnce = (
  eventKey: string,
  eventName: string, 
  params: Record<string, any> = {}
) => {
  const storageKey = `fb_tracked_${eventKey}`;
  if (localStorage.getItem(storageKey)) {
    console.log(`[FB] ⏭️ Skip ${eventName}: already tracked (${eventKey})`);
    return false;
  }
  trackFBEvent(eventName, params);
  localStorage.setItem(storageKey, Date.now().toString());
  return true;
};

// Track GA4 event only once per unique key (stored in localStorage) - PERMANENT
export const trackGA4EventOnce = (
  eventKey: string,
  eventName: string, 
  params: Record<string, any> = {}
) => {
  const storageKey = `ga4_tracked_${eventKey}`;
  if (localStorage.getItem(storageKey)) {
    console.log(`[GA4] ⏭️ Skip ${eventName}: already tracked permanently (${eventKey})`);
    return false;
  }
  trackGA4Event(eventName, params);
  localStorage.setItem(storageKey, Date.now().toString());
  return true;
};

// Track GA4 event only once per SESSION (stored in sessionStorage) - RESETS ON NEW TAB
export const trackGA4EventOncePerSession = (
  eventKey: string,
  eventName: string, 
  params: Record<string, any> = {}
) => {
  const storageKey = `ga4_session_${eventKey}`;
  if (sessionStorage.getItem(storageKey)) {
    console.log(`[GA4] ⏭️ Skip ${eventName}: already tracked this session (${eventKey})`);
    return false;
  }
  trackGA4Event(eventName, params);
  sessionStorage.setItem(storageKey, Date.now().toString());
  console.log(`[GA4] ✅ Session event tracked: ${eventName} (${eventKey})`);
  return true;
};

// Track FB event only once per SESSION (stored in sessionStorage) - RESETS ON NEW TAB
export const trackFBEventOncePerSession = (
  eventKey: string,
  eventName: string, 
  params: Record<string, any> = {}
) => {
  const storageKey = `fb_session_${eventKey}`;
  if (sessionStorage.getItem(storageKey)) {
    console.log(`[FB] ⏭️ Skip ${eventName}: already tracked this session (${eventKey})`);
    return false;
  }
  trackFBEvent(eventName, params);
  sessionStorage.setItem(storageKey, Date.now().toString());
  console.log(`[FB] ✅ Session event tracked: ${eventName} (${eventKey})`);
  return true;
};
