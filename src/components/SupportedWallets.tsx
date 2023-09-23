import { AnimatePresence, motion } from "framer-motion";
import {
  letterVariant,
  sentenceVariant,
  textVariants,
  wrapperVariants,
} from "./ui/animationVariants";
import { Status, supportedWallets } from "../utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const headingText = "Supported Wallets".split("");

const getStatusComponent = (status: Status) => {
  switch (status) {
    case Status.WORKING:
      return (
        <div className="relative block w-2 h-2 bg-green-300 rounded-full shadow-inner shadow-green-500">
          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-halo"></span>
        </div>
      );
    case Status.PARTIAL:
      return (
        <div className="relative block w-2 h-2 bg-yellow-300 rounded-full shadow-inner shadow-yellow-500">
          <span className="absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-halo"></span>
        </div>
      );
    case Status.BREAKING:
      return (
        <div className="relative block w-2 h-2 bg-red-300 rounded-full shadow-inner shadow-red-500">
          <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-halo"></span>
        </div>
      );
    default:
      return "";
  }
};

const Wallet: React.FC<{ name: string; url: string; status: Status }> = ({
  name,
  url,
  status,
}) => {
  const utmURL = new URL(url);
  utmURL.searchParams.set("utm_campaign", "eip6963");
  utmURL.searchParams.set("utm_source", "eip6963.org");
  return (
    <motion.a
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      key={name}
      href={utmURL.toString()}
      target="_blank"
      className={`relative z-10 flex items-center justify-between px-3 py-2 overflow-hidden rounded-md shadow-lg group bg-zinc-900 text-zinc-100 hover:bg-zinc-800`}
    >
      <div className="flex items-center gap-3">
        {getStatusComponent(status)}
        <p>{name}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 transition-transform duration-150 translate-x-8 text-zinc-500 group-hover:translate-x-0"
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
  );
};

const SupportedWallets: React.FC<{
  emulateAvailable: boolean;
  handleAddWindowProvider: () => void;
}> = ({ emulateAvailable, handleAddWindowProvider }) => {
  const statusOrder = Object.values(Status);
  const sortedSupportedWallets = supportedWallets.sort((a, b) => {
    const aStatus = statusOrder.indexOf(a.status);
    const bStatus = statusOrder.indexOf(b.status);
    return aStatus - bStatus;
  });
  return (
    <>
      <div className="absolute bottom-0 px-5 py-3 mx-auto my-0 border-2 rounded-xl z-[49] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-4 w-screen sm:w-[28rem] border-transparent sm:border-zinc-700/50 sm:my-4 bg-zinc-950/80 backdrop-blur-md lg:rounded-t-xl rounded-t-none border-t-zinc-700/50">
        <div className="flex items-end self-start justify-between w-full py-4 mb-3 overflow-hidden h-fit">
          <motion.h1
            variants={sentenceVariant}
            initial="initial"
            animate="animate"
            className="overflow-hidden text-xl font-medium tracking-tighter whitespace-pre text-zinc-200"
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
          <div className="flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="p-1 transition-colors rounded-md bg-zinc-800 text-inherit hover:text-zinc-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
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
                  <TooltipContent side="right" className="backdrop-blur-lg">
                    <p>Copy to Clipboard</p>
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="overflow-hidden text-zinc-700 h-fit">
            <motion.a
              href="https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts"
              rel="noopener noreferrer"
              target="_blank"
              variants={textVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: 0.625,
              }}
              className="relative inline-flex items-center gap-1 transition-colors hover:underline underline-offset-2 hover:text-zinc-600"
            >
              Add Wallet
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
        <div className="w-full max-h-[calc(100vh_-_10rem)] gap-2 relative mb-3 grid grid-cols-2">
          <AnimatePresence mode="wait">
            {emulateAvailable && (
              <motion.button
                variants={wrapperVariants}
                initial="initial"
                animate="animate"
                key={"windowProvider"}
                onClick={handleAddWindowProvider}
                className="relative z-10 flex items-center justify-between px-4 py-2 pr-3 overflow-hidden bg-indigo-900 rounded-md shadow-lg lg:hidden group text-zinc-100 hover:bg-indigo-800"
              >
                <p>Emulate with wallet</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform duration-150 translate-x-8 text-zinc-300 group-hover:translate-x-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </motion.button>
            )}
            {sortedSupportedWallets.map(props => (
              <Wallet
                key={props.name}
                name={props.name}
                url={props.url}
                status={props.status}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SupportedWallets;
