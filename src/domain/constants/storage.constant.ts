/** localStorage key for saved wallet (address + network + name) */
export const WALLET_ADDRESS_STORAGE_KEY = 'exury_wallet_address';

export interface StoredWallet {
  address: string;
  network: string;
  name: string;
}

/** Redes habituales para recibir USDC, ETH, etc. */
export const WALLET_NETWORKS = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'arbitrum', label: 'Arbitrum One' },
  { value: 'bnb', label: 'BNB Smart Chain' },
  { value: 'base', label: 'Base' },
  { value: 'optimism', label: 'Optimism' },
  { value: 'avalanche', label: 'Avalanche C-Chain' },
] as const;
