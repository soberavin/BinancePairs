export type AssetType = {
    baseAsset: string
    quoteAsset: "USDT" | "BUSD"
    type: "FUTURES" | "SPOT" | "SPOT&FUTURES"
    myId: number
}

export type SpotAssetsData = {
    busdPairs: AssetType[]
    usdtPairs: AssetType[]
}

export type AssetsData = {
    busdPairs: AssetType[]
    usdtPairs: AssetType[]
    futuresPairs: AssetType[]
}







