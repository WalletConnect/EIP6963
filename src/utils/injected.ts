import { v4 as uuidv4 } from "uuid";
import { WindowProvider } from "@wagmi/connectors";

import defaultProviderIcon from "../assets/default.svg";

import { EIP6963ProviderInfo } from "./types";

export function getInjectedInfo(
  ethereum?: WindowProvider
): EIP6963ProviderInfo {
  const uuid = uuidv4().toString();

  if (!ethereum)
    return {
      walletId: "unknown",
      uuid,
      name: "Injected",
      icon: defaultProviderIcon,
    };

  const getName = (provider: WindowProvider) => {
    if (provider.isApexWallet)
      return {
        walletId: "isApexWallet",
        uuid,
        name: "Apex Wallet",
        icon: defaultProviderIcon, // TODO: replace with Apex Wallet icon
      };
    if (provider.isAvalanche)
      return {
        walletId: "isAvalanche",
        uuid,
        name: "Core Wallet",
        icon: defaultProviderIcon, // TODO: replace with Core Wallet icon
      };
    if (provider.isBackpack)
      return {
        walletId: "isBackpack",
        uuid,
        name: "Backpack",
        icon: defaultProviderIcon, // TODO: replace with Backpack icon
      };
    if (provider.isBifrost)
      return {
        walletId: "isBifrost",
        uuid,
        name: "Bifrost Wallet",
        icon: defaultProviderIcon, // TODO: replace with Bifrost Wallet icon
      };
    if (provider.isBitKeep)
      return {
        walletId: "isBitKeep",
        uuid,
        name: "BitKeep",
        icon: defaultProviderIcon, // TODO: replace with BitKeep icon
      };
    if (provider.isBitski)
      return {
        walletId: "isBitski",
        uuid,
        name: "Bitski",
        icon: defaultProviderIcon, // TODO: replace with Bitski icon
      };
    if (provider.isBlockWallet)
      return {
        walletId: "isBlockWallet",
        uuid,
        name: "BlockWallet",
        icon: defaultProviderIcon, // TODO: replace with BlockWallet icon
      };
    if (provider.isBraveWallet)
      return {
        walletId: "isBraveWallet",
        uuid,
        name: "Brave Wallet",
        icon: defaultProviderIcon, // TODO: replace with Brave Wallet icon
      };
    if (provider.isCoinbaseWallet)
      return {
        walletId: "isCoinbaseWallet",
        uuid,
        name: "Coinbase Wallet",
        icon: defaultProviderIcon, // TODO: replace with Coinbase Wallet icon
      };
    if (provider.isDawn)
      return {
        walletId: "isDawn",
        uuid,
        name: "Dawn Wallet",
        icon: defaultProviderIcon, // TODO: replace with Dawn Wallet icon
      };
    if (provider.isDefiant)
      return {
        walletId: "isDefiant",
        uuid,
        name: "Defiant",
        icon: defaultProviderIcon, // TODO: replace with Defiant icon
      };
    if (provider.isEnkrypt)
      return {
        walletId: "isEnkrypt",
        uuid,
        name: "Enkrypt",
        icon: defaultProviderIcon, // TODO: replace with Enkrypt icon
      };
    if (provider.isExodus)
      return {
        walletId: "isExodus",
        uuid,
        name: "Exodus",
        icon: defaultProviderIcon, // TODO: replace with Exodus icon
      };
    if (provider.isFrame)
      return {
        walletId: "isFrame",
        uuid,
        name: "Frame",
        icon: defaultProviderIcon, // TODO: replace with Frame icon
      };
    if (provider.isFrontier)
      return {
        walletId: "isFrontier",
        uuid,
        name: "Frontier Wallet",
        icon: defaultProviderIcon, // TODO: replace with Frontier Wallet icon
      };
    if (provider.isGamestop)
      return {
        walletId: "isGamestop",
        uuid,
        name: "GameStop Wallet",
        icon: defaultProviderIcon, // TODO: replace with GameStop Wallet icon
      };
    if (provider.isHyperPay)
      return {
        walletId: "isHyperPay",
        uuid,
        name: "HyperPay Wallet",
        icon: defaultProviderIcon, // TODO: replace with HyperPay Wallet icon
      };
    if (provider.isImToken)
      return {
        walletId: "isImToken",
        uuid,
        name: "ImToken",
        icon: defaultProviderIcon, // TODO: replace with ImToken icon
      };
    if (provider.isHaloWallet)
      return {
        walletId: "isHaloWallet",
        uuid,
        name: "Halo Wallet",
        icon: defaultProviderIcon, // TODO: replace with Halo Wallet icon
      };
    if (provider.isKuCoinWallet)
      return {
        walletId: "isKuCoinWallet",
        uuid,
        name: "KuCoin Wallet",
        icon: defaultProviderIcon, // TODO: replace with KuCoin Wallet icon
      };
    if (provider.isMathWallet)
      return {
        walletId: "isMathWallet",
        uuid,
        name: "MathWallet",
        icon: defaultProviderIcon, // TODO: replace with MathWallet icon
      };
    if (provider.isOkxWallet || provider.isOKExWallet)
      return {
        walletId: provider.isOkxWallet ? "isOkxWallet" : "isOKExWallet",
        uuid,
        name: "OKX Wallet",
        icon: defaultProviderIcon, // TODO: replace with OKX Wallet icon
      };
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
      return {
        walletId: provider.isOneInchIOSWallet
          ? "isOneInchIOSWallet"
          : "isOneInchAndroidWallet",
        uuid,
        name: "1inch Wallet",
        icon: defaultProviderIcon, // TODO: replace with 1inch Wallet icon
      };
    if (provider.isOpera)
      return {
        walletId: "isOpera",
        uuid,
        name: "Opera",
        icon: defaultProviderIcon, // TODO: replace with Opera icon
      };
    if (provider.isPhantom)
      return {
        walletId: "isPhantom",
        uuid,
        name: "Phantom",
        icon: defaultProviderIcon, // TODO: replace with Phantom icon
      };
    if (provider.isPortal)
      return {
        walletId: "isPortal",
        uuid,
        name: "Ripio Portal",
        icon: defaultProviderIcon, // TODO: replace with Ripio Portal icon
      };
    if (provider.isRabby)
      return {
        walletId: "isRabby",
        uuid,
        name: "Rabby Wallet",
        icon: defaultProviderIcon, // TODO: replace with Rabby Wallet icon
      };
    if (provider.isRainbow)
      return {
        walletId: "isRainbow",
        uuid,
        name: "Rainbow",
        icon: defaultProviderIcon, // TODO: replace with Rainbow icon
      };
    if (provider.isStatus)
      return {
        walletId: "isStatus",
        uuid,
        name: "Status",
        icon: defaultProviderIcon, // TODO: replace with Status icon
      };
    if (provider.isTalisman)
      return {
        walletId: "isTalisman",
        uuid,
        name: "Talisman",
        icon: defaultProviderIcon, // TODO: replace with Talisman icon
      };
    if (provider.isTally)
      return {
        walletId: "isTally",
        uuid,
        name: "Taho",
        icon: defaultProviderIcon, // TODO: replace with Taho icon
      };
    if (provider.isTokenPocket)
      return {
        walletId: "isTokenPocket",
        uuid,
        name: "TokenPocket",
        icon: defaultProviderIcon, // TODO: replace with TokenPocket icon
      };
    if (provider.isTokenary)
      return {
        walletId: "isTokenary",
        uuid,
        name: "Tokenary",
        icon: defaultProviderIcon, // TODO: replace with Tokenary icon
      };
    if (provider.isTrust || provider.isTrustWallet)
      return {
        walletId: provider.isTrust ? "isTrust" : "isTrustWallet",
        uuid,
        name: "Trust Wallet",
        icon: defaultProviderIcon, // TODO: replace with Trust Wallet icon
      };
    if (provider.isXDEFI)
      return {
        walletId: "isXDEFI",
        uuid,
        name: "XDEFI Wallet",
        icon: defaultProviderIcon, // TODO: replace with XDEFI Wallet icon
      };
    if (provider.isZerion)
      return {
        walletId: "isZerion",
        uuid,
        name: "Zerion",
        icon: defaultProviderIcon, // TODO: replace with Zerion icon
      };
    if (provider.isMetaMask)
      return {
        walletId: "isMetaMask",
        uuid,
        name: "MetaMask",
        icon: defaultProviderIcon, // TODO: replace with MetaMask icon
      };
  };

  return (
    getName(ethereum) ?? {
      walletId: "unknown",
      uuid,
      name: "Injected",
      icon: defaultProviderIcon,
    }
  );
}
