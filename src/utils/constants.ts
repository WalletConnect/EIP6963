export enum Status {
  WORKING = "working",
  PARTIAL = "partial",
  BREAKING = "breaking",
}

export const supportedWallets = [
  {
    name: "Enkrypt",
    url: "https://www.enkrypt.com",
    status: Status.WORKING,
  },
  {
    name: "Zerion",
    url: "https://zerion.io",
    status: Status.WORKING,
  },
  {
    name: "Rainbow",
    url: "https://rainbow.me/extension",
    status: Status.BREAKING,
  },
  {
    name: "Iron",
    url: "https://github.com/iron-wallet/iron",
    status: Status.WORKING,
  },
  {
    name: "Brave",
    url: "https://brave.com",
    status: Status.WORKING,
  },
  {
    name: "TokenPocket",
    url: "https://tokenpocket.pro",
    status: Status.WORKING,
  },
  {
    name: "Phantom",
    url: "https://phantom.app/download",
    status: Status.WORKING,
  },
  {
    name: "Bitski",
    url: "https://bitski.com",
    status: Status.PARTIAL,
  },
];
