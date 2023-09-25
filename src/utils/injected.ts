import { WindowProvider } from "@wagmi/connectors";

import defaultProviderIcon from "../assets/default.svg";
import rainbowProviderIcon from "../assets/rainbow.svg";
import xdefiProviderIcon from "../assets/xdefi.svg";


import { EIP6963ProviderInfo } from "./types";

export function getInjectedInfo(
  uuid: string,
  ethereum?: WindowProvider
): EIP6963ProviderInfo {
  if (!ethereum)
    return {
      uuid,
      name: "Injected",
      icon: defaultProviderIcon,
      rdns?: "",
    };

  const getName = (provider: WindowProvider) => {
    if (provider.isApexWallet)
      return {
        uuid,
        name: "Apex Wallet",
        icon: defaultProviderIcon, // TODO: replace with Apex Wallet icon
      };
    if (provider.isAvalanche)
      return {
        uuid,
        name: "Core Wallet",
        icon: defaultProviderIcon, // TODO: replace with Core Wallet icon
      };
    if (provider.isBackpack)
      return {
        uuid,
        name: "Backpack",
        icon: defaultProviderIcon, // TODO: replace with Backpack icon
      };
    if (provider.isBifrost)
      return {
        uuid,
        name: "Bifrost Wallet",
        icon: defaultProviderIcon, // TODO: replace with Bifrost Wallet icon
      };
    if (provider.isBitKeep)
      return {
        uuid,
        name: "BitKeep",
        icon: defaultProviderIcon, // TODO: replace with BitKeep icon
      };
    if (provider.isBitski)
      return {
        uuid,
        name: "Bitski",
        icon: defaultProviderIcon, // TODO: replace with Bitski icon
      };
    if (provider.isBlockWallet)
      return {
        uuid,
        name: "BlockWallet",
        icon: defaultProviderIcon, // TODO: replace with BlockWallet icon
      };
    if (provider.isBraveWallet)
      return {
        uuid,
        name: "Brave Wallet",
        icon: defaultProviderIcon, // TODO: replace with Brave Wallet icon
      };
    if (provider.isCoinbaseWallet)
      return {
        uuid,
        name: "Coinbase Wallet",
        icon: defaultProviderIcon, // TODO: replace with Coinbase Wallet icon
      };
    if (provider.isDawn)
      return {
        uuid,
        name: "Dawn Wallet",
        icon: defaultProviderIcon, // TODO: replace with Dawn Wallet icon
      };
    if (provider.isDefiant)
      return {
        uuid,
        name: "Defiant",
        icon: defaultProviderIcon, // TODO: replace with Defiant icon
      };
    if (provider.isEnkrypt)
      return {
        uuid,
        name: "Enkrypt",
        icon: defaultProviderIcon, // TODO: replace with Enkrypt icon
      };
    if (provider.isExodus)
      return {
        uuid,
        name: "Exodus",
        icon: defaultProviderIcon, // TODO: replace with Exodus icon
      };
    if (provider.isFrame)
      return {
        uuid,
        name: "Frame",
        icon: defaultProviderIcon, // TODO: replace with Frame icon
      };
    if (provider.isFrontier)
      return {
        uuid,
        name: "Frontier Wallet",
        icon: defaultProviderIcon, // TODO: replace with Frontier Wallet icon
      };
    if (provider.isGamestop)
      return {
        uuid,
        name: "GameStop Wallet",
        icon: defaultProviderIcon, // TODO: replace with GameStop Wallet icon
      };
    if (provider.isHyperPay)
      return {
        uuid,
        name: "HyperPay Wallet",
        icon: defaultProviderIcon, // TODO: replace with HyperPay Wallet icon
      };
    if (provider.isImToken)
      return {
        uuid,
        name: "ImToken",
        icon: defaultProviderIcon, // TODO: replace with ImToken icon
      };
    if (provider.isHaloWallet)
      return {
        uuid,
        name: "Halo Wallet",
        icon: defaultProviderIcon, // TODO: replace with Halo Wallet icon
      };
    if (provider.isKuCoinWallet)
      return {
        uuid,
        name: "KuCoin Wallet",
        icon: defaultProviderIcon, // TODO: replace with KuCoin Wallet icon
      };
    if (provider.isMathWallet)
      return {
        uuid,
        name: "MathWallet",
        icon: defaultProviderIcon, // TODO: replace with MathWallet icon
      };
    if (provider.isOkxWallet || provider.isOKExWallet)
      return {
        uuid,
        name: "OKX Wallet",
        icon: defaultProviderIcon, // TODO: replace with OKX Wallet icon
      };
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
      return {
        uuid,
        name: "1inch Wallet",
        icon: defaultProviderIcon, // TODO: replace with 1inch Wallet icon
      };
    if (provider.isOpera)
      return {
        uuid,
        name: "Opera",
        icon: defaultProviderIcon, // TODO: replace with Opera icon
      };
    if (provider.isPhantom)
      return {
        uuid,
        name: "Phantom",
        icon: defaultProviderIcon, // TODO: replace with Phantom icon
      };
    if (provider.isPortal)
      return {
        uuid,
        name: "Ripio Portal",
        icon: defaultProviderIcon, // TODO: replace with Ripio Portal icon
      };
    if (provider.isRabby)
      return {
        uuid,
        name: "Rabby Wallet",
        icon: defaultProviderIcon, // TODO: replace with Rabby Wallet icon
      };
    if (provider.isRainbow)
      return {
        uuid,
        name: "Rainbow",
        icon: rainbowProviderIcon,
      };
    if (provider.isStatus)
      return {
        uuid,
        name: "Status",
        icon: defaultProviderIcon, // TODO: replace with Status icon
      };
    if (provider.isTalisman)
      return {
        uuid,
        name: "Talisman",
        icon: defaultProviderIcon, // TODO: replace with Talisman icon
      };
    if (provider.isTally)
      return {
        uuid,
        name: "Taho",
        icon: defaultProviderIcon, // TODO: replace with Taho icon
      };
    if (provider.isTokenPocket)
      return {
        uuid,
        name: "TokenPocket",
        icon: defaultProviderIcon, // TODO: replace with TokenPocket icon
      };
    if (provider.isTokenary)
      return {
        uuid,
        name: "Tokenary",
        icon: defaultProviderIcon, // TODO: replace with Tokenary icon
      };
    if (provider.isTrust || provider.isTrustWallet)
      return {
        uuid,
        name: "Trust Wallet",
        icon: defaultProviderIcon, // TODO: replace with Trust Wallet icon
      };
    if (provider.isXDEFI)
      return {
        uuid,
        name: "XDEFI",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8yMTkxXzQyOTApIj4KPHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSIxMDQiIGZpbGw9IiMzMzVERTUiLz4KPHBhdGggZD0iTTQ2My40MzggMjQxLjI0N0M0NjAuNzY1IDIwNS4xMzUgNDQ4LjU4IDE3MC4zMzggNDI4LjA4NyAxNDAuMjcxQzQwNy41OTkgMTEwLjIwOSAzNzkuNTA5IDg1LjkxODIgMzQ2LjU3OSA2OS43OTZDMzEzLjY1MyA1My42NzggMjc3LjAzMiA0Ni4yODA0IDI0MC4zMiA0OC4zMzYzQzIwMy42MDUgNTAuMzkyMSAxNjguMDY5IDYxLjgyNTUgMTM3LjIxMiA4MS41MjAxQzEwNi4zNTQgMTAxLjIxIDgxLjIzOTQgMTI4LjQ4IDY0LjMzODYgMTYwLjYzNkw2My41MzYgMTYyLjI1N0M1OC4xOTcxIDE3My4xMjYgNTQuNTg3OCAxODQuNzQ1IDUyLjg0MTEgMTk2LjY5N0M0Ny44NDU1IDIzMi4wMjEgNTUuNTkyIDI2My40NiA3NS44Mjc1IDI4Ny42NjdDOTcuOTU5OSAzMTQuMTM2IDEzMy45OTMgMzI5Ljg3OSAxNzcuMjE1IDMzMS45NDdDMjI5LjgzMiAzMzQuNTU1IDI4Mi4xNDggMzIwLjQzNCAzMTkuMjc1IDI5NC40NThMMzQxLjI4NyAzMDcuMzUzQzMyMC4yNTggMzI1LjI5MSAyNzEuNjM3IDM1Ny41OTQgMTkxLjExMiAzNjIuMDA5QzEwMC43MTkgMzY2LjkzIDYzLjA0MjUgMzM4LjAwMSA2Mi42OTA1IDMzNy43MDZMNTYuMzUxNyAzNDUuNDAzTDQ4IDM1NS4yNzNDNDkuNjAwOCAzNTYuNiA4NS43Mjg1IDM4NS4zMzUgMTcwLjU3NiAzODUuMzM1QzE3Ny41MiAzODUuMzM1IDE4NC44MTYgMzg1LjMzNSAxOTIuNDEyIDM4NC43NDZDMjg5Ljg3MyAzNzkuMzkxIDM0My40NzYgMzM3LjU3NSAzNjIuMjMxIDMxOS42MjlMMzgwLjY0MiAzMzAuNjM3QzM2OC4yNjEgMzQ2LjY1OCAzNTMuMDI1IDM2MC4zMzMgMzM1LjY3IDM3MC45ODJDMjc0LjUwNCA0MDkuODQ5IDE5Ni43MDggNDE0Ljg2NyAxNDIuMjQyIDQxMi4xNjJMMTQxLjA5NiA0MzQuODMxQzE1MC4yNDIgNDM1LjI3MyAxNTkuMDM1IDQzNS40NzEgMTY3LjU4IDQzNS40NzFDMzIxLjA0OCA0MzUuNDcxIDM4My4xMzIgMzY2LjcxOSA0MDAuNTM5IDM0Mi4wNjJMNDE0LjkyNSAzNTAuNDg3QzQwMS4xMzUgMzczLjYwMyAzODIuMzkzIDM5My41NjcgMzU5LjkzMSA0MDguOTM5QzMzMy4wMzQgNDI3LjM0NSAzMDEuNzM1IDQzOC41MzggMjY5LjExNCA0NDEuNDE1TDI3MS4xMTQgNDY0QzMwNy43MzkgNDYwLjc4NiAzNDIuODg4IDQ0OC4yMzYgMzczLjA4OSA0MjcuNTgxQzQwMy4yOSA0MDYuOTI2IDQyNy41MDggMzc4Ljg4MSA0NDMuMzQ5IDM0Ni4yMDdDNDU5LjE4NSAzMTMuNTI5IDQ2Ni4xMTYgMjc3LjM1OCA0NjMuNDM4IDI0MS4yNDdaTTM3NC44MSAyNDQuNzM5QzM2NC42MjYgMjQ0LjczOSAzNTYuMzY4IDIzNi42MTMgMzU2LjM2OCAyMjYuNTg2QzM1Ni4zNjggMjE2LjU2IDM2NC42MjEgMjA4LjQzMyAzNzQuODEgMjA4LjQzM0MzODQuOTkgMjA4LjQzMyAzOTMuMjQ3IDIxNi41NiAzOTMuMjQ3IDIyNi41ODZDMzkzLjI0NyAyMzYuNjEzIDM4NC45OTQgMjQ0LjczOSAzNzQuODEgMjQ0LjczOVoiIGZpbGw9IiNFQ0VDRUMiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yMTkxXzQyOTAiPgo8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K", 
        rdns?: "io.xdefi",
      };
    if (provider.isZerion)
      return {
        uuid,
        name: "Zerion",
        icon: defaultProviderIcon, // TODO: replace with Zerion icon
      };
    if (provider.isMetaMask)
      return {
        uuid,
        name: "MetaMask",
        icon: defaultProviderIcon, // TODO: replace with MetaMask icon
      };
  };

  return (
    getName(ethereum) ?? {
      uuid,
      name: "Injected",
      icon: defaultProviderIcon,
      rdns?: "",
    }
  );
}
