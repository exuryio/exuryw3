/**
 * Carga direcciones de depósito de Exury desde variables Vite.
 *
 * Formatos soportados (mismo orden que en GitHub Secrets del frontend):
 *   - VITE_EXURY_USDC_WALLET_BSC, VITE_EXURY_USDC_WALLET_ETH, …
 *   - VITE_EXURY_DEPOSIT_WALLETS_JSON (JSON agrupado por activo)
 */
export type DepositNetworkOption = { value: string; label: string; address: string };

const PER_WALLET_KEY = /^VITE_EXURY_([A-Z0-9]+)_WALLET_([A-Z0-9]+)$/;

const NETWORK_LABELS: Record<string, string> = {
  BSC: 'BSC (BEP20)',
  ETH: 'Ethereum (ERC20)',
  SEGWIT: 'Bitcoin (SegWit)',
  ARBITRUM: 'Arbitrum',
  BASE: 'Base',
  ALGO: 'Algorand',
  AVAXC: 'Avalanche C-Chain',
  POL: 'Polygon',
  SOL: 'Solana',
};

function networkLabel(networkCode: string): string {
  return NETWORK_LABELS[networkCode] ?? networkCode;
}

function parseJsonBlob(): Record<string, DepositNetworkOption[]> {
  const raw = import.meta.env.VITE_EXURY_DEPOSIT_WALLETS_JSON as string | undefined;
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, DepositNetworkOption[]>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function parsePerWalletEnvVars(): Record<string, DepositNetworkOption[]> {
  const wallets: Record<string, DepositNetworkOption[]> = {};
  const env = import.meta.env as Record<string, string | undefined>;

  for (const key of Object.keys(env)) {
    const match = key.match(PER_WALLET_KEY);
    if (!match) continue;

    const asset = match[1];
    const networkCode = match[2];
    const address = env[key]?.trim();
    if (!address) continue;

    if (!wallets[asset]) wallets[asset] = [];

    const value = networkCode.toLowerCase();
    if (wallets[asset].some((n) => n.value === value)) continue;

    wallets[asset].push({
      value,
      label: networkLabel(networkCode),
      address,
    });
  }

  return wallets;
}

function mergeWalletMaps(
  ...maps: Record<string, DepositNetworkOption[]>[]
): Record<string, DepositNetworkOption[]> {
  const merged: Record<string, DepositNetworkOption[]> = {};

  for (const map of maps) {
    for (const [asset, networks] of Object.entries(map)) {
      if (!merged[asset]) merged[asset] = [];
      for (const net of networks) {
        if (!merged[asset].some((n) => n.value === net.value)) {
          merged[asset].push(net);
        }
      }
    }
  }

  return merged;
}

/** Fallback local / build con secrets VITE_EXURY_*_WALLET_* de GitHub. */
export function loadDepositWalletsFromEnv(): Record<string, DepositNetworkOption[]> {
  return mergeWalletMaps(parsePerWalletEnvVars(), parseJsonBlob());
}
