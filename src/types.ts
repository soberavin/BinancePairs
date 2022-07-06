export type AssetType = {
    baseAsset: string
    quoteAsset: "USDT" | "BUSD"
    type: "FUTURES" | "SPOT" | "SPOT&FUTURES"
}

export type AssetsData = {
    busdPairs: AssetType[]
    usdtPairs: AssetType[]
    futuresPairs: AssetType[]
  }