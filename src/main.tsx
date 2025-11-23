import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { MegaphoneProvider } from "0xmegaphone-sdk/react";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MegaphoneProvider apiKey="YOUR_API_KEY" operatorFid={1768n} isTestnet={true}>
          <App />
        </MegaphoneProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
