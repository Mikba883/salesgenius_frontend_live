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
    window.fbq('track', eventName, params);
    console.log(`[FB] ✅ Event sent via fbq: ${eventName}`);
  } else {
    console.warn(`[FB] ⚠️ fbq not available: ${eventName}`);
  }
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

// Track GA4 event only once per unique key (stored in localStorage)
export const trackGA4EventOnce = (
  eventKey: string,
  eventName: string, 
  params: Record<string, any> = {}
) => {
  const storageKey = `ga4_tracked_${eventKey}`;
  if (localStorage.getItem(storageKey)) {
    console.log(`[GA4] ⏭️ Skip ${eventName}: already tracked (${eventKey})`);
    return false;
  }
  trackGA4Event(eventName, params);
  localStorage.setItem(storageKey, Date.now().toString());
  return true;
};
