import mixpanel from 'mixpanel-browser';

const token = import.meta.env.PUBLIC_MIXPANEL_TOKEN;

let initialized = false;

export function initMixpanel() {
  if (initialized || !token) {
    return;
  }

  try {
    mixpanel.init(token, {
      debug: import.meta.env.DEV,
      track_pageview: false,
      persistence: 'localStorage'
    });
    initialized = true;
  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (!initialized) {
    initMixpanel();
  }

  try {
    mixpanel.track(eventName, properties);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export function trackPageView(pageName: string, language: string = 'en') {
  trackEvent('landing_page_view', {
    page: pageName,
    language: language,
    timestamp: new Date().toISOString()
  });
}

export function trackCTAClick(location: string, language: string = 'en') {
  trackEvent('cta_clicked', {
    location: location,
    language: language,
    timestamp: new Date().toISOString()
  });
}

export function trackPricingView(plan: string, language: string = 'en') {
  trackEvent('pricing_plan_viewed', {
    plan: plan,
    language: language,
    timestamp: new Date().toISOString()
  });
}

export function trackFAQOpen(question: string, language: string = 'en') {
  trackEvent('faq_opened', {
    question: question,
    language: language,
    timestamp: new Date().toISOString()
  });
}
