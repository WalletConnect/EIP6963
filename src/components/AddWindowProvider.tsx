import { motion } from "framer-motion";
import { EVMProviderDetected } from "../utils/types";
import { buttonVariants } from "./ui/animationVariants";

const AddWindowProvider: React.FC<{
  providers: Map<string, EVMProviderDetected>;
  handleClick: () => void;
}> = ({ providers, handleClick: addWindowProvider }) => {
  return (
    // display add provider button if window.ethereum is available
    window.ethereum &&
    providers.size === 0 && (
      <motion.button
        key="add-provider"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={addWindowProvider}
        className="absolute z-50 hidden w-12 h-12 text-3xl rounded-full lg:grid bottom-8 right-8 shadow-bold group bg-zinc-800 text-zinc-300 place-items-center"
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
  );
};

export default AddWindowProvider;
