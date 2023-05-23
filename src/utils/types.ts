export interface EIP1193Provider {
  request: (payload: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}

export interface EIP6963ProviderInfo {
  walletId: string;
  uuid: string;
  name: string;
  icon: string;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

export interface EVMProviderDetected extends EIP6963ProviderDetail {
  connected: boolean;
  accounts: string[];
  request?: EIP1193Provider["request"];
}

export interface EIP6963AnnounceProviderEvent extends Event {
  detail: EIP6963ProviderDetail;
}
