import { SpotAssetsData, AssetType } from "../types";

export default function filterSpotSymbols(obj: any) {
  const filteredSymbolsData: SpotAssetsData = {
    busdPairs: [],
    usdtPairs: [],
  };
  for (let i = 0; i < obj.length; i++) {
    const { status, quoteAsset, isSpotTradingAllowed, baseAsset } =
      obj[i];

    if (status === "TRADING" && baseAsset !== "USDT" && baseAsset !== "TUSD") {
      if (quoteAsset === "USDT") {
        if (isSpotTradingAllowed === true) {
          let spotAsset: AssetType = {
            baseAsset,
            quoteAsset,
            type: "SPOT",
            myId: i
          };

          filteredSymbolsData.usdtPairs.push(spotAsset);
        }
      } else if (quoteAsset === "BUSD" && isSpotTradingAllowed === true) {
        let spotAsset: AssetType = {
          baseAsset,
          quoteAsset,
          type: "SPOT",
          myId: i
        };
        filteredSymbolsData.busdPairs.push(spotAsset);
      }
    }
  }
  return filteredSymbolsData;
}
