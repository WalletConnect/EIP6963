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
        icon: xdefiProviderIcon,
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
    }
  );
}
