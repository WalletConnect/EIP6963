export const truncateAddress = (address: string, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export function mapToObj<T = any>(map: Map<string, T>): Record<string, T> {
  return Object.fromEntries(map.entries());
}

export function objToMap<T = any>(obj: Record<string, T>): Map<string, T> {
  return new Map<string, T>(Object.entries<T>(obj));
}

export async function chainIDtoName(chainID: string): Promise<string> {
  const res = await (
    await fetch("https://chainid.network/chains_mini.json")
  ).json();
  const chainData = res.find(
    (chain: any) => chain.chainId === parseInt(chainID, 16)
  );
  return chainData?.name || "Unknown";
}

export function isDataURI(uri: string): boolean {
  return /data:(image\/[-+\w.]+)(;?\w+=[-\w]+)*(;base64)?,.*/gu.test(uri);
}
