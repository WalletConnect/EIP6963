import { AnimatePresence, motion } from "framer-motion";
import {
  letterVariant,
  sentenceVariant,
  textVariants,
  wrapperVariants,
} from "./ui/animationVariants";
import { supportedWallets } from "../utils/constants";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const headingText = "Supported Wallets".split("");

type WalletProps = { name: string; url: string };

const Wallet: React.FC<WalletProps> = ({ name, url }) => {
  const utmURL = new URL(url);
  utmURL.searchParams.set("utm_campaign", "eip6963");
  utmURL.searchParams.set("utm_source", "eip6963.org");
  return (
    <motion.a
      variants={textVariants}
      initial="initial"
      animate="animate"
      key={name}
      href={utmURL.toString()}
      target="_blank"
      className="relative z-10 flex items-center justify-between px-4 py-2 overflow-hidden rounded-md shadow-lg group bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
    >
      <p>{name}</p>
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

const Items: React.FC<{ currentItems: WalletProps[] }> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map(props => (
          <Wallet key={props.name} name={props.name} url={props.url} />
        ))}
      {currentItems.length % 2 === 1 && <div className="not-sr-only" />}
    </>
  );
};

const PaginatedItems: React.FC<{ itemsPerPage: number }> = ({
  itemsPerPage,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = supportedWallets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(supportedWallets.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % supportedWallets.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        }
        pageClassName="bg-zinc-900 text-zinc-500 w-8 h-8 rounded-sm grid place-items-center transition-colors"
        nextClassName="bg-zinc-900 text-zinc-500 w-8 h-8 rounded-r-lg rounded-l-sm grid place-items-center transition-[opacity]"
        previousClassName="bg-zinc-900 text-zinc-500 w-8 h-8 rounded-l-lg rounded-r-sm grid place-items-center transition-[opacity]"
        breakClassName="opacity-70 bg-zinc-900 text-zinc-500 w-8 h-8 rounded-sm grid text-xs place-items-center transition-colors"
        className="flex items-center justify-start w-full mt-4 space-x-0.5 font-mono text-sm leading-tight rounded-md shadow-lg text-zinc-700 select-none"
        activeClassName="!bg-zinc-800 !text-zinc-300 pointer-events-none"
        disabledClassName="opacity-60 pointer-events-none"
        pageLinkClassName="h-full w-full grid place-items-center"
        nextLinkClassName="h-full w-full grid place-items-center"
        previousLinkClassName="h-full w-full grid place-items-center"
        breakLinkClassName="h-full w-full grid place-items-center"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

const SupportedWallets: React.FC<{
  emulateAvailable: boolean;
  handleAddWindowProvider: () => void;
}> = ({ emulateAvailable, handleAddWindowProvider }) => {
  return (
    <>
      <div className="absolute bottom-0 px-5 py-3 mx-auto my-0 border-2 rounded-xl z-[9999] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-4 w-screen sm:w-[28rem] border-transparent sm:border-zinc-700/50 sm:my-4 bg-zinc-950/80 backdrop-blur-md lg:rounded-t-xl rounded-t-none border-t-zinc-700/50">
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
          <p className="overflow-hidden h-fit text-zinc-700 ">
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
        <div className="w-full max-h-[calc(100vh_-_10rem)] gap-2 relative mb-3">
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
            <motion.div
              variants={wrapperVariants}
              initial="initial"
              animate="animate"
              key={"supportedWallets"}
              transition={{
                delay: 0.625,
              }}
              className="grid w-full grid-cols-2 col-span-2 gap-2"
            >
              <PaginatedItems itemsPerPage={6} />
              <a
                className="flex items-center justify-center ml-auto w-fit h-8 py-1.5 px-4 mt-4 space-x-0.5 text-sm leading-none rounded-full shadow-lg text-indigo-300 bg-indigo-900 select-none hover:bg-indigo-700 hover:text-indigo-100 transition-colors"
                href="https://twitter.com/boidushya/status/1714389971778552128"
                target="_blank"
                rel="noopener noreferrer"
              >
                Steps to add wallet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 ml-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SupportedWallets;
