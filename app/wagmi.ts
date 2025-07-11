// wagmi.ts - Custom wallet selection
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { baseSepolia, base } from 'wagmi/chains';
import {
  metaMaskWallet,
  coinbaseWallet,
  rabbyWallet,
  trustWallet,
  phantomWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        rabbyWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [
        trustWallet,
        phantomWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'ProductFeed',
    projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  }
);

export const config = createConfig({
  connectors,
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/4FF6xgfo305aOiFhplzY7M6AaWWZMmg_'),
    [base.id]: http(),
  },
});