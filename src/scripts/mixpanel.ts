// Mixpanel removed for performance optimization
// Using GA4 only for analytics

export function initMixpanel() {}
export function trackEvent(_eventName: string, _properties?: Record<string, any>) {}
export function trackPageView(_pageName: string, _language: string = 'en') {}
export function trackCTAClick(_location: string, _language: string = 'en') {}
export function trackPricingView(_plan: string, _language: string = 'en') {}
export function trackFAQOpen(_question: string, _language: string = 'en') {}
