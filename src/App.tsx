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

const warningVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.625,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.625,
    },
  },
  exit: {
    opacity: 0,
    y: 2,
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
        accounts: [],
      };

      setProviders(prevProviders => {
        const providers = new Map(prevProviders);
        providers.set(announcedProvider.info.uuid, announcedProvider);
        return providers;
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
  }, []);

  async function connectProvider(selectedProvider: EVMProviderDetected) {
    const request =
      selectedProvider.request ?? selectedProvider.provider.request;
    try {
      const accounts = (await request({
        method: "eth_requestAccounts",
      })) as string[];
      setProviders(prevProviders => {
        const providers = new Map(prevProviders);
        providers.set(selectedProvider.info.uuid, {
          ...selectedProvider,
          accounts,
        });
        return providers;
      });
    } catch (error) {
      console.log(error);
    }
  }

  const modifyProviders = (selectedProvider: EVMProviderDetected) => {
    setProviders(prevProviders => {
      const providers = new Map(prevProviders);
      providers.set(selectedProvider.info.uuid, selectedProvider);
      return providers;
    });
  };

  const addWindowProvider = () => {
    if (typeof window.ethereum !== "undefined") {
      const uuid = windowProviderUUID || crypto.randomUUID();
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
          <p className="pl-1 overflow-hidden font-semibold text-zinc-700 h-fit">
            <motion.a
              href="https://eips.ethereum.org/EIPS/eip-6963"
              rel="noopener noreferrer"
              target="_blank"
              variants={textVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: 0.625,
              }}
              className="relative inline-flex items-center gap-1 hover:underline underline-offset-2"
            >
              EIP-6963
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-20 w-[calc(100%_-_2rem)] mx-4 my-4 overflow-hidden pointer-events-none h-1/4 bg-gradient-to-b from-transparent to-zinc-950" />
        <div
          ref={contentRef}
          className="w-full max-h-[calc(100vh_-_10rem)] space-y-2 relative"
        >
          <AnimatePresence mode="wait">
            {providers.size !== 0 ? (
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
              <motion.p
                key="no-providers"
                variants={warningVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-2 leading-snug text-zinc-700"
              >
                {window.ethereum && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="flex-shrink-0 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                )}
                {window.ethereum
                  ? `No EIP-6963 compatible providers found`
                  : `No EIP-6963 or window.ethereum providers found. Make sure you have a wallet installed.`}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {
            // display add provider button if window.ethereum is available
            window.ethereum && providers.size === 0 && (
              <motion.button
                key="add-provider"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={addWindowProvider}
                className="absolute z-50 grid w-12 h-12 text-3xl rounded-full bottom-8 right-8 shadow-bold group bg-zinc-800 text-zinc-300 place-items-center"
              >
                <span className="text-zinc-400 pointer-events-none absolute inline-block px-2 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 transition-all opacity-0 -translate-x-36 group-hover:-translate-x-40 w-fit whitespace-pre group-hover:opacity-100 z-[0]">
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
              </motion.button>
            )
          }
        </AnimatePresence>
      </main>
      <Toaster />
    </>
  );
}

export default App;
