import { supabase } from "@/integrations/supabase/client";

// Generate unique event ID for deduplication
const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Get Facebook click ID from URL or cookie
const getFbc = (): string | undefined => {
  // Check URL for fbclid
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  if (fbclid) {
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  
  // Check cookie
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc') {
      return value;
    }
  }
  return undefined;
};

// Get Facebook browser ID from cookie
const getFbp = (): string | undefined => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      return value;
    }
  }
  return undefined;
};

interface UserData {
  email?: string;
  phone?: string;
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}

/**
 * Send conversion event to Meta via server-side CAPI
 * This bypasses browser privacy restrictions
 */
export const trackServerEvent = async (
  eventName: string,
  userData?: UserData,
  customData?: CustomData
): Promise<void> => {
  const eventId = generateEventId();
  
  try {
    // Also send browser-side event for deduplication (if Pixel works)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, customData || {}, { eventID: eventId });
    }

    // Send server-side event
    const { data, error } = await supabase.functions.invoke('meta-conversions', {
      body: {
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: {
          email: userData?.email,
          phone: userData?.phone,
          client_user_agent: navigator.userAgent,
          fbc: getFbc(),
          fbp: getFbp(),
        },
        custom_data: customData,
      },
    });

    if (error) {
      console.warn('Meta CAPI error:', error);
    } else {
      console.log(`Meta CAPI: ${eventName} sent successfully`, data);
    }
  } catch (err) {
    console.warn('Meta CAPI tracking failed:', err);
  }
};

// Convenience functions for common events
export const trackLead = (email?: string) => 
  trackServerEvent('Lead', { email });

export const trackCompleteRegistration = (email?: string) => 
  trackServerEvent('CompleteRegistration', { email });

export const trackInitiateCheckout = (email?: string, value: number = 11.70, currency: string = 'USD') => 
  trackServerEvent('InitiateCheckout', { email }, { value, currency });

export const trackPurchase = (email?: string, value: number = 11.70, currency: string = 'USD') => 
  trackServerEvent('Purchase', { email }, { value, currency });
