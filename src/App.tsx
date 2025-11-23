import { MegaphoneProvider, TimelinePanel, Logo } from "0xmegaphone-sdk/react";
import { Context, sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App() {
  const { address } = useAccount();
  const [context, setContext] = useState<Context.MiniAppContext | null>(null);

  useEffect(() => {
    const initializeSdk = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready();
    };

    initializeSdk();
  }, []);

  return (
    <>
      <div>Megaphone SDK Example</div>
      <Logo />
      {context && (
        <MegaphoneProvider apiKey="YOUR_API_KEY" operatorFid={1768n} isTestnet={true}>
          <TimelinePanel
            account={address ?? "0x0000000000000000000000000000000000000000"}
            fid={BigInt(context.user.fid)}
            name={context.user.username ?? ""}
          />
        </MegaphoneProvider>
      )}
    </>
  );
}

export default App;
