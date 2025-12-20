/**
 * PWA Configuration
 * 
 * Centralized configuration for Progressive Web App settings.
 * This allows easy updates and scalability for future PWA features.
 */

export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  orientation: "portrait" | "landscape" | "portrait-primary" | "landscape-primary" | "any";
  startUrl: string;
  scope: string;
  categories: string[];
  iconSizes: number[];
  shortcuts?: Array<{
    name: string;
    shortName: string;
    description: string;
    url: string;
    icon: string;
  }>;
}

export const pwaConfig: PWAConfig = {
  name: "Exury - Intercambio de Criptomonedas",
  shortName: "Exury",
  description: "Plataforma regulada para intercambio de criptomonedas en la Unión Europea",
  themeColor: "#00BB72",
  backgroundColor: "#000000",
  display: "standalone",
  orientation: "portrait-primary",
  startUrl: "/",
  scope: "/",
  categories: ["finance", "business"],
  iconSizes: [192, 512, 180], // 180 is for Apple touch icon
  shortcuts: [
    {
      name: "Intercambiar",
      shortName: "Intercambiar",
      description: "Realizar intercambio de criptomonedas",
      url: "/exchange",
      icon: "/icons/icon-192x192.png",
    },
  ],
};

/**
 * Generate manifest.json from configuration
 */
export function generateManifest(): Record<string, unknown> {
  return {
    name: pwaConfig.name,
    short_name: pwaConfig.shortName,
    description: pwaConfig.description,
    start_url: pwaConfig.startUrl,
    display: pwaConfig.display,
    background_color: pwaConfig.backgroundColor,
    theme_color: pwaConfig.themeColor,
    orientation: pwaConfig.orientation,
    scope: pwaConfig.scope,
    categories: pwaConfig.categories,
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: pwaConfig.shortcuts?.map((shortcut) => ({
      name: shortcut.name,
      short_name: shortcut.shortName,
      description: shortcut.description,
      url: shortcut.url,
      icons: [
        {
          src: shortcut.icon,
          sizes: "192x192",
        },
      ],
    })),
    prefer_related_applications: false,
  };
}

