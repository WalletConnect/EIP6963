import { chainIDtoName, truncateAddress } from "../utils/functions";
import { EVMProviderDetected } from "../utils/types";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useToast } from "./ui/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  clickHandler: () => void;
  provider: EVMProviderDetected;
  modifyProviders: (provider: EVMProviderDetected) => void;
};

const wrapperVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const connectVariants = {
  initial: {
    opacity: 0,
    x: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 10,
  },
};

const accountVariants = {
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -1,
  },
};

const Wallet = (props: Props) => {
  const { clickHandler, provider, modifyProviders } = props;
  const { toast } = useToast();

  const [chain, setChain] = React.useState<string>("");

  const isConnected = !!provider.accounts.length;

  React.useEffect(() => {
    if (!provider.provider) return;
    const currentProvider = provider.provider;
    currentProvider.on("accountsChanged", (accounts: string[]) => {
      console.log("accountsChanged", accounts);
      provider.accounts = accounts;
      modifyProviders(provider);
    });
    currentProvider.on("chainChanged", async (chainID: any) => {
      console.log("chainChanged", chainID);
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    });
    currentProvider.on("disconnect", (error: Error) => {
      console.log("disconnect", error);
    });
  }, [provider.provider, provider, modifyProviders]);

  React.useEffect(() => {
    async function getCurrentChainName() {
      if (!provider.provider) return;
      const currentProvider = provider.provider;
      const chainID = (await currentProvider.request({
        method: "eth_chainId",
      })) as string;
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    }
    getCurrentChainName();
  }, [provider.provider]);

  return (
    <motion.div
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      key={provider.info.uuid}
      className="overflow-hidden text-base"
    >
      <div className="relative z-10 flex items-center justify-between px-3 py-2 rounded-md shadow-lg bg-zinc-800 text-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <img
              className="w-5 h-5 rounded"
              src={provider.info.icon}
              alt={provider.info.name}
            />
            <h1>{provider.info.name}</h1>
            <AnimatePresence mode="wait">
              {chain && isConnected && (
                <motion.p
                  variants={accountVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={chain}
                  className="flex items-center gap-1 pr-1.5 px-2 py-1 text-xs leading-tight text-green-200 border border-green-600 rounded-md bg-green-900/25"
                >
                  <span className="max-w-[15ch] truncate">{chain}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-2.5 h-2.5"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                  </svg>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {!provider.provider ? (
              <motion.div
                key="Connected"
                variants={connectVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="rounded-md select-none py-1.5 px-2 pl-2.5 bg-red-900/25 border border-red-500/75 text-red-200 text-xs leading-none flex items-center gap-1 cursor-not-allowed"
              >
                <span>No Provider</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {isConnected ? (
                  <motion.div
                    key="Connected"
                    variants={connectVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="rounded-full select-none py-1.5 px-3 bg-indigo-900 border border-indigo-500 text-indigo-100 text-xs leading-none flex items-center gap-2"
                  >
                    <span>Connected</span>
                    <div className="relative block w-2 h-2 bg-green-300 rounded-full shadow-inner shadow-green-500">
                      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-halo"></span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="Connect"
                    onClick={clickHandler}
                    variants={connectVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="rounded-full py-1.5 px-3 bg-indigo-500 text-sm leading-none flex items-center gap-1 hover:bg-indigo-600 transition-colors hover:shadow-lg"
                  >
                    <span>Connect</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.25}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="relative w-full h-fit">
        {isConnected && (
          <AnimatePresence mode="wait">
            <motion.div
              variants={accountVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative flex flex-col text-sm bg-zinc-900/75 text-zinc-400 rounded-b-md"
            >
              <div className="absolute bottom-full w-full h-4 bg-zinc-900/75 z-[0]" />
              <AnimatePresence mode="wait">
                {provider.accounts.map((account, index) => (
                  <motion.div
                    key={account}
                    variants={accountVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`z-10 flex items-center justify-between px-4 py-2 ${
                      index !== 0 ? `border-t border-zinc-800/60` : ``
                    }`}
                  >
                    <p className="select-none">{truncateAddress(account)}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            navigator.clipboard.writeText(account);
                            toast({
                              description: "Copied address to clipboard",
                            });
                          }}
                        >
                          <div className="p-1 transition-colors rounded-md bg-zinc-800 text-inherit hover:text-zinc-200">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"
                              ></path>
                              <rect
                                width="10.5"
                                height="10.5"
                                x="8.75"
                                y="8.75"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                rx="2"
                              ></rect>
                            </svg>
                          </div>
                        </TooltipTrigger>
                        <TooltipPortal>
                          <TooltipContent side="left">
                            <p>Copy to Clipboard</p>
                          </TooltipContent>
                        </TooltipPortal>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Wallet;
