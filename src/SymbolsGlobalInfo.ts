import { useEffect, useState } from "react";
import filterFutSymbols from "./filters/filterFutSymbols";
import filterSpotSymbols from "./filters/filterSpotSymbols";
import filterSymbols from "./filters/filterSymbols";
import type { SpotAssetsData, AssetType, AssetsData } from "./types";

function getSpotSymbolsReq() {
  return fetch("https://api.binance.com/api/v3/exchangeInfo", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((val) => {
      const filteredSymbols = filterSpotSymbols(val.symbols);

      return filteredSymbols;
    });
}

function getFutSymbolsReq() {
  return fetch("https://fapi.binance.com/fapi/v1/exchangeInfo", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((val) => {
      const filteredFutSymbols = filterFutSymbols(val.symbols);
      return filteredFutSymbols;
    });
}

export default function SymbolsGlobalInfo() {
  const [filteredSymbolsData, setFilteredSymbolsData] = useState<AssetsData>({
    busdPairs: [],
    usdtPairs: [],
    futuresPairs: [],
  });

  useEffect(() => {

    let spotSymbolsData: SpotAssetsData = {
      busdPairs: [],
      usdtPairs: [],
    }
    let futSymbolsData: AssetType[] = []


    const getSpotPromise = getSpotSymbolsReq().then((filteredSymbols) => {
      spotSymbolsData = filteredSymbols
    })

    const getFuturesPromise = getFutSymbolsReq().then((filteredFutSymbols) => {
      futSymbolsData = filteredFutSymbols
    })

    Promise.all([
      getSpotPromise,
      getFuturesPromise
    ]).then(() => {
      setFilteredSymbolsData(filterSymbols(spotSymbolsData, futSymbolsData));
    });
  }, []);


  return filteredSymbolsData
}
