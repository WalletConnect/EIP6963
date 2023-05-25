import { v4 as uuidv4 } from "uuid";

import React from "react";
import {
  EIP6963AnnounceProviderEvent,
  EVMProviderDetected,
} from "./utils/types";
import Wallet from "./components/Wallet";
import { Toaster } from "./components/ui/Toaster";
import { AnimatePresence, motion } from "framer-motion";
import useResizeObserver from "use-resize-observer";
import { getInjectedInfo } from "./utils/injected";
import { mapToObj } from "./utils/functions";

const textVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const sentenceVariant = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.02,
    },
  },
};

const letterVariant = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const headingText = "Discovered Wallets".split("");

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

function App() {
  const [windowProviderUUID, setWindowProviderUUID] = React.useState<string>();
  const [providers, setProviders] = React.useState<
    Map<string, EVMProviderDetected>
  >(new Map());

  const contentRef = React.useRef<HTMLDivElement>(null);

  const { height } = useResizeObserver({
    ref: contentRef,
  });

  React.useEffect(() => {
    const onAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
      console.log("Event Triggered: ", event.type);
      console.table(event.detail.info);
      const announcedProvider = {
        ...event.detail,
        connected: false,
        accounts: [],
      };

      setProviders(prevProviders => {
        return new Map(
          prevProviders.set(announcedProvider.info.uuid, announcedProvider)
        );
      });
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
    try {
      const accounts = (await request({
        method: "eth_requestAccounts",
      })) as string[];
      setProviders(prevProviders => {
        selectedProvider.connected = true;
        selectedProvider.accounts = accounts;
        prevProviders.set(selectedProvider.info.uuid, selectedProvider);
        return new Map(prevProviders);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const modifyProviders = (selectedProvider: EVMProviderDetected) => {
    setProviders(prevProviders => {
      prevProviders.set(selectedProvider.info.uuid, selectedProvider);
      return new Map(prevProviders);
    });
  };

  const addWindowProvider = () => {
    if (typeof window.ethereum !== "undefined") {
      const uuid = windowProviderUUID || uuidv4().toString();
      setWindowProviderUUID(uuid);
      window.dispatchEvent(
        new CustomEvent("eip6963:announceProvider", {
          detail: {
            info: getInjectedInfo(uuid, window.ethereum),
            provider: window.ethereum,
          },
        })
      );
    }
    window.dispatchEvent(
      new CustomEvent("eip6963:announceProvider", {
        detail: {
          info: {
            walletId: "org.eip6963.dummy",
            uuid: uuidv4().toString(),
            name: "EIP-6963 Wallet",
            icon: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Apple_Wallet_Icon.svg",
          },
        },
      })
    );
  };

  React.useEffect(() => {
    const current = contentRef.current;
    if (current && height) {
      if (height >= window.innerHeight - 160) {
        current.style.overflowY = "scroll";
      } else if (current.style.overflowY === "scroll") {
        current.style.overflowY = "auto";
      }
    }
  }, [height]);

  return (
    <>
      <main className="relative flex flex-col items-center justify-start min-h-screen sm:min-h-[calc(100vh_-_2rem)] py-4 max-w-md mx-auto border-0 sm:border-2 border-zinc-700/50 rounded-none sm:rounded-xl px-4 my-0 sm:my-4 bg-zinc-950">
        <div className="flex items-end self-start justify-between w-full py-4 mb-4 overflow-hidden leading-snug h-fit">
          <motion.h1
            variants={sentenceVariant}
            initial="initial"
            animate="animate"
            className="pr-1 overflow-hidden text-3xl font-semibold tracking-tighter whitespace-pre text-zinc-200"
          >
            {headingText.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                variants={letterVariant}
                className="relative inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <p className="pl-1 overflow-hidden font-semibold text-zinc-800 h-fit">
            <motion.span
              variants={textVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: 0.625,
              }}
              className="relative inline-block"
            >
              EIP-6963
            </motion.span>
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-20 w-[calc(100%_-_2rem)] mx-4 my-4 overflow-hidden pointer-events-none h-1/4 bg-gradient-to-b from-transparent to-zinc-950" />
        <div
          ref={contentRef}
          className="w-full max-h-[calc(100vh_-_10rem)] space-y-2 relative"
        >
          <AnimatePresence>
            {Array.from(providers) ? (
              Array.from(providers).map(([_, provider]) => {
                return (
                  <Wallet
                    key={provider.info.uuid}
                    clickHandler={() => connectProvider(provider)}
                    provider={provider}
                    modifyProviders={modifyProviders}
                  />
                );
              })
            ) : (
              <span>No EIP-6963 compatible providers found</span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={addWindowProvider}
          className="absolute z-50 grid w-12 h-12 text-3xl rounded-full bottom-8 right-8 shadow-bold group bg-zinc-800 text-zinc-300 place-items-center"
        >
          <span className="text-zinc-400 pointer-events-none absolute inline-block px-2 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 transition-all opacity-0 -translate-x-28 group-hover:-translate-x-32 w-fit whitespace-pre group-hover:opacity-100 z-[0]">
            Add window.ethereum provider as EIP-6963
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
