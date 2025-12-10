
'use client';

// import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <MiniKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={baseSepolia}
            config={{
              appearance: {
                mode: "auto",
                theme: "mini-app-theme",
                name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
                logo: process.env.NEXT_PUBLIC_ICON_URL,
              },
            }}
          >
          {props.children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// 'use client';
// import '@rainbow-me/rainbowkit/styles.css';
// import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { WagmiProvider } from 'wagmi';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { config } from './wagmi';
// import { ReactNode } from 'react';
// import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
// import { baseSepolia } from 'wagmi/chains';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//       gcTime: 1000 * 60 * 30,
//     },
//   },
// });

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider theme={lightTheme({
//             accentColor: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
//             accentColorForeground: 'white',
//             borderRadius: 'small',
//             fontStack: 'system',
//           })}>
//           <MiniKitProvider
//             apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
//             chain={baseSepolia}
//             config={{
//               appearance: {
//                 mode: "auto",
//                 theme: "mini-app-theme",
//                 name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
//                 logo: process.env.NEXT_PUBLIC_ICON_URL,
//               },
//             }}
//           >
//           {children}
//           </MiniKitProvider>
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }