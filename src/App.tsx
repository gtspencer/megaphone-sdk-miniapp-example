import { MegaphoneProvider, TimelinePanel, Logo } from "0xmegaphone-sdk/react";
import { Megaphone } from "0xmegaphone-sdk";
import { Context, sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App() {
  const { address } = useAccount();
  const [context, setContext] = useState<Context.MiniAppContext | null>(null);
  const [ii1Value, setIi1Value] = useState<string>("");
  const [ii2Value, setIi2Value] = useState<string>("");
  const [ii3Value, setIi3Value] = useState<string>("");

  const megaphoneConfig = {
    apiKey: import.meta.env.VITE_MEGAPHONE_API_KEY,
    operatorFid: 1768n,
    isTestnet: true,
    referrer: "0x8f4359d1c2166452b5e7a02742d6fe9ca5448fde" as `0x${string}`,
  }

  const megaphone = new Megaphone(megaphoneConfig);

  useEffect(() => {
    const initializeSdk = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready();
    };

    initializeSdk();
  }, []);

  const handleIncentivizedInteraction = (level: number, value: string) => {
    const numValue = Number(value);
    megaphone.recordIncentivizedInteraction({
      userFid: BigInt(numValue),
      interactionLevel: level,
    });
  };

  return (
    <>
      <div>Megaphone SDK Example</div>
      <Logo />
      
      <section>
        <h2>Incentivized Interactions</h2>
        <div>
          <div>
            <input
              type="number"
              value={ii1Value}
              onChange={(e) => setIi1Value(e.target.value)}
              placeholder="Enter FID"
            />
            <button type="button" onClick={() => handleIncentivizedInteraction(1, ii1Value)}>
              1
            </button>
          </div>
          <div>
            <input
              type="number"
              value={ii2Value}
              onChange={(e) => setIi2Value(e.target.value)}
              placeholder="Enter FID"
            />
            <button type="button" onClick={() => handleIncentivizedInteraction(2, ii2Value)}>
              2
            </button>
          </div>
          <div>
            <input
              type="number"
              value={ii3Value}
              onChange={(e) => setIi3Value(e.target.value)}
              placeholder="Enter FID"
            />
            <button type="button" onClick={() => handleIncentivizedInteraction(3, ii3Value)}>
              3
            </button>
          </div>
        </div>
      </section>

      {context && (
        <MegaphoneProvider {...megaphoneConfig}>
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
