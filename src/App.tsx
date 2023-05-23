import * as uuid from "uuid";
import { WindowProvider } from "@wagmi/connectors";
import defaultProviderIcon from "./assets/default.svg";
import React from "react";
import {
  EIP6963AnnounceProviderEvent,
  EVMProviderDetected,
} from "./utils/types";
import Wallet from "./components/Wallet";
import { Toaster } from "./components/ui/Toaster";
import { AnimatePresence, motion } from "framer-motion";

const textVariants = (type: string) => ({
  initial: {
    opacity: 0,
    x: type === "ltr" ? "-100%" : "100%",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
});

interface CustomEventMap {
  "eip6963:announceProvider": CustomEvent<EIP6963AnnounceProviderEvent>;
}
declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

function getInjectedName(ethereum?: WindowProvider): string {
  if (!ethereum) return "Injected";

  const getName = (provider: WindowProvider) => {
    if (provider.isApexWallet) return "Apex Wallet";
    if (provider.isAvalanche) return "Core Wallet";
    if (provider.isBackpack) return "Backpack";
    if (provider.isBifrost) return "Bifrost Wallet";
    if (provider.isBitKeep) return "BitKeep";
    if (provider.isBitski) return "Bitski";
    if (provider.isBlockWallet) return "BlockWallet";
    if (provider.isBraveWallet) return "Brave Wallet";
    if (provider.isCoinbaseWallet) return "Coinbase Wallet";
    if (provider.isDawn) return "Dawn Wallet";
    if (provider.isDefiant) return "Defiant";
    if (provider.isEnkrypt) return "Enkrypt";
    if (provider.isExodus) return "Exodus";
    if (provider.isFrame) return "Frame";
    if (provider.isFrontier) return "Frontier Wallet";
    if (provider.isGamestop) return "GameStop Wallet";
    if (provider.isHyperPay) return "HyperPay Wallet";
    if (provider.isImToken) return "ImToken";
    if (provider.isHaloWallet) return "Halo Wallet";
    if (provider.isKuCoinWallet) return "KuCoin Wallet";
    if (provider.isMathWallet) return "MathWallet";
    if (provider.isOkxWallet || provider.isOKExWallet) return "OKX Wallet";
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
      return "1inch Wallet";
    if (provider.isOpera) return "Opera";
    if (provider.isPhantom) return "Phantom";
    if (provider.isPortal) return "Ripio Portal";
    if (provider.isRabby) return "Rabby Wallet";
    if (provider.isRainbow) return "Rainbow";
    if (provider.isStatus) return "Status";
    if (provider.isTalisman) return "Talisman";
    if (provider.isTally) return "Taho";
    if (provider.isTokenPocket) return "TokenPocket";
    if (provider.isTokenary) return "Tokenary";
    if (provider.isTrust || provider.isTrustWallet) return "Trust Wallet";
    if (provider.isXDEFI) return "XDEFI Wallet";
    if (provider.isZerion) return "Zerion";
    if (provider.isMetaMask) return "MetaMask";
  };

  return getName(ethereum) ?? "Injected";
}
function App() {
  const [providers, setProviders] = React.useState<EVMProviderDetected[]>([]);

  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const windowProvider = {
        info: {
          walletId: "window-ethereum-provider",
          uuid: uuid.v4().toString(),
          name: getInjectedName(window.ethereum),
          icon: defaultProviderIcon,
        },
        provider: window.ethereum,
        connected: false,
        accounts: [],
      };

      const otherProviders = providers.filter(
        provider => provider.info.name !== windowProvider.info.name
      );

      console.log("Window Provider:");
      console.table(windowProvider.info);

      console.log("Other Provider:");
      if (otherProviders.length === 0) console.log("None");
      else {
        console.table(otherProviders.map(provider => provider.info));
      }

      setProviders([windowProvider, ...otherProviders]);
    }

    const onAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
      console.log("Event Triggered: ", event.type);
      console.table(event.detail.info);
      const announcedProvider = {
        ...event.detail,
        connected: false,
        accounts: [],
      };

      setProviders(providers => [...providers, announcedProvider]);
    };

    window.addEventListener(
      "eip6963:announceProvider",
      onAnnounceProvider as EventListener
    );
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () => {
      window.removeEventListener(
        "eip6963:announceProvider",
        onAnnounceProvider as EventListener
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connectProvider(selectedProvider: EVMProviderDetected) {
    const request =
      selectedProvider.request ?? selectedProvider.provider.request;
    const accounts = (await request({
      method: "eth_requestAccounts",
    })) as string[];
    setProviders(prev => {
      const newProvider = [...prev];
      console.log(newProvider);
      const index = newProvider.findIndex(
        provider => provider.info.uuid === selectedProvider.info.uuid
      );
      newProvider[index].connected = true;
      newProvider[index].accounts = accounts;
      return newProvider;
    });
  }

  const addDummyWallet = () => {
    window.dispatchEvent(
      new CustomEvent("eip6963:announceProvider", {
        detail: {
          info: {
            walletId: "org.eip6963.dummy",
            uuid: uuid.v4().toString(),
            name: "EIP-6963 Wallet",
            icon: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Apple_Wallet_Icon.svg",
          },
        },
      })
    );
  };

  return (
    <>
      <main className="relative flex flex-col items-center justify-start min-h-screen sm:min-h-[calc(100vh_-_2rem)] py-4 max-w-md mx-auto border-0 sm:border-2 border-zinc-700/50 rounded-none sm:rounded-xl px-4 my-0 sm:my-4 bg-zinc-950">
        <div className="flex items-end self-start justify-between w-full py-4 mb-4 leading-snug">
          <h1 className="pr-1 overflow-hidden text-3xl font-semibold tracking-tighter text-zinc-200 h-fit">
            <motion.span
              variants={textVariants("ltr")}
              initial="initial"
              animate="animate"
              transition={{
                type: "spring",
                damping: 16,
                stiffness: 200,
                mass: 0.5,
                velocity: 2,
              }}
              className="relative inline-block"
            >
              Discovered Wallets
            </motion.span>
          </h1>
          <p className="pl-1 overflow-hidden font-semibold text-zinc-800 h-fit">
            <motion.span
              variants={textVariants("rtl")}
              initial="initial"
              animate="animate"
              transition={{
                type: "spring",
                damping: 14,
                stiffness: 200,
                mass: 0.5,
                velocity: 2,
                delay: 0.5,
              }}
              className="relative inline-block"
            >
              EIP-6963
            </motion.span>
          </p>
        </div>
        <div className="w-full space-y-2">
          <AnimatePresence>
            {providers.map(provider => {
              return (
                <Wallet
                  key={provider.info.uuid}
                  clickHandler={() => connectProvider(provider)}
                  provider={provider}
                  connected={provider.connected}
                  accounts={provider.accounts}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <button
          onClick={addDummyWallet}
          className="absolute bottom-0 right-0 grid w-12 h-12 mb-8 mr-8 text-3xl rounded-full group bg-zinc-800 text-zinc-300 place-items-center"
        >
          <span className="text-zinc-400 pointer-events-none absolute inline-block px-2 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 transition-all opacity-0 -translate-x-28 group-hover:-translate-x-32 w-fit whitespace-pre group-hover:opacity-100 z-[0]">
            Add a wallet with EIP-6963
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </main>
      <Toaster />
    </>
  );
}

export default App;
