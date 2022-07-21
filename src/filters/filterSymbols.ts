import { SpotAssetsData, AssetType, AssetsData } from "../types";

export default function filterSymbols(spotSymbolsData: SpotAssetsData, futSymbolsData: AssetType[]) {

    let filteredSymbolsData: AssetsData = {
        busdPairs: [],
        usdtPairs: [],
        futuresPairs: []
    }

    filteredSymbolsData.usdtPairs = spotSymbolsData.usdtPairs.filter((x) => !futSymbolsData.some(y => x.baseAsset === y.baseAsset))
    filteredSymbolsData.busdPairs = spotSymbolsData.busdPairs.filter((x) => !futSymbolsData.some(y => x.baseAsset === y.baseAsset))
    filteredSymbolsData.futuresPairs = futSymbolsData


    return filteredSymbolsData

}