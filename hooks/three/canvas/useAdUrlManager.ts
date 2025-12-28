/**
 * Ad URL Manager
 * Handles ad URL generation, click targets, and potential ad network integration
 */

// Default placeholder URLs - these can be replaced with real ad targets
const DEFAULT_AD_URLS = [
  "https://example.com/product1",
  "https://example.com/product2",
  "https://example.com/service1",
  "https://example.com/offer1",
  "https://example.com/deal1",
  "https://example.com/special-offer",
  "https://example.com/new-product",
  "https://example.com/limited-time",
  "https://example.com/premium-service",
  "https://example.com/exclusive-deal",
];

/**
 * Configuration for ad URL behavior
 */
export interface AdUrlConfig {
  urls?: string[];
  openInNewTab?: boolean;
  trackClicks?: boolean;
  onAdClick?: (adId: number, url: string) => void;
}

/**
 * Gets the URL for a specific ad ID
 */
export function getAdUrl(
  adId: number,
  urls: string[] = DEFAULT_AD_URLS
): string {
  // Cycle through URLs for different ads
  return urls[adId % urls.length];
}

/**
 * Handles opening an ad URL with proper security settings
 */
export function openAdUrl(url: string, openInNewTab: boolean = true): void {
  if (openInNewTab) {
    // Open in new tab with security best practices
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    // Navigate in current window
    window.location.href = url;
  }
}

/**
 * Logs ad click for analytics/tracking
 */
export function logAdClick(
  adId: number,
  url: string,
  position?: { x: number; y: number }
): void {
  console.log(
    `Banner ad ${adId} clicked! Opening: ${url}`,
    position
      ? `at position: ${position.x.toFixed(0)}, ${position.y.toFixed(0)}`
      : ""
  );

  // Here we could integrate with analytics services:
  // - Google Analytics
  // - Adobe Analytics
  // - Custom tracking API
}

/**
 * Standalone handleAdClick function for direct import (needed for useCanvasTexture)
 */
export function handleAdClick(
  adId: number,
  textureX: number,
  textureY: number
): void {
  const url = getAdUrl(adId);
  const position = { x: textureX, y: textureY };

  // Log the click
  logAdClick(adId, url, position);

  // Open the URL
  openAdUrl(url, true);
}

/**
 * Hook for managing ad URLs and click handling
 */
export function useAdUrlManager(config: AdUrlConfig = {}) {
  const {
    urls = DEFAULT_AD_URLS,
    openInNewTab = true,
    trackClicks = true,
    onAdClick,
  } = config;

  const handleAdClickWithConfig = (
    adId: number,
    position?: { x: number; y: number }
  ): void => {
    const url = getAdUrl(adId, urls);

    // Log the click if tracking is enabled
    if (trackClicks) {
      logAdClick(adId, url, position);
    }

    // Custom click handler if provided
    if (onAdClick) {
      onAdClick(adId, url);
    }

    // Open the URL
    openAdUrl(url, openInNewTab);
  };

  const getUrl = (adId: number) => getAdUrl(adId, urls);

  return {
    handleAdClick: handleAdClickWithConfig,
    getUrl,
    config: {
      totalUrls: urls.length,
      openInNewTab,
      trackClicks,
    },
  };
}

/**
 * Utility function to validate ad URLs
 */
export function validateAdUrls(urls: string[]): {
  valid: string[];
  invalid: string[];
} {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach((url) => {
    try {
      new URL(url);
      valid.push(url);
    } catch {
      invalid.push(url);
    }
  });

  return { valid, invalid };
}

/**
 * Helper to generate test ad URLs
 */
export function generateTestUrls(
  count: number,
  baseUrl: string = "https://example.com"
): string[] {
  return Array.from({ length: count }, (_, i) => `${baseUrl}/ad-${i + 1}`);
}
