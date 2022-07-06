import React, { useEffect, useState } from "react";
import "./App.css";
import { AssetsList } from "./assetsLists";
import { AssetsData, AssetType } from "./types";

const initialData = {
  busdPairs: [{ baseAsset: "BTC", quoteAsset: "BUSD", type: "SPOT" }],
  usdtPairs: [{ baseAsset: "BTC", quoteAsset: "USDT", type: "SPOT" }],
  futuresPairs: [
    { baseAsset: "BTC", quoteAsset: "USDT", type: "SPOT&FUTURES" },
  ],
};

function App() {
  const [result, setResult] = useState<any>();
  const [assetsData, setAssetsData] = useState<any>({
    busdPairs: [],
    usdtPairs: [],
    futuresPairs: [],
  });

  let pairsInfo: any;
  function setPairsInfo(value: any) {
    pairsInfo = value;
    setAssetsData(filterTheAssets(pairsInfo));
  }

  function getPairsReq() {
    fetch("https://api.binance.com/api/v3/exchangeInfo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((val) => setPairsInfo(val));
  }

  useEffect(() => {
    getPairsReq();
  }, []);

  function filterTheAssets(obj: any) {
    const filteredPairsData: AssetsData = {
      busdPairs: [],
      usdtPairs: [],
      futuresPairs: [],
    };
    for (let i = 0; i < obj.symbols.length; i++) {
      const {
        status,
        quoteAsset,
        isSpotTradingAllowed,
        isMarginTradingAllowed,
        baseAsset,
      } = obj.symbols[i];

      if (status === "TRADING" && baseAsset !== "USDT" && baseAsset !== "TUSD") {
        if (quoteAsset === "USDT") {
          if (
            isSpotTradingAllowed === true &&
            isMarginTradingAllowed === false
          ) {
            let spotAsset: AssetType = {
              baseAsset,
              quoteAsset,
              type: "SPOT",
            };
            
            filteredPairsData.usdtPairs.push(spotAsset);
          } else if (isMarginTradingAllowed === true) {
            let futuresAsset: AssetType = {
              baseAsset,
              quoteAsset,
              type: "SPOT&FUTURES",
            };
            filteredPairsData.futuresPairs.push(futuresAsset);
          }
        } else if (
          quoteAsset === "BUSD" &&
          isSpotTradingAllowed === true &&
          isMarginTradingAllowed === false
        ) {
          let spotAsset: AssetType = {
            baseAsset,
            quoteAsset,
            type: "SPOT",
          };
          filteredPairsData.busdPairs.push(spotAsset);
        }
      }
    }
    console.log('data',filteredPairsData)
    return filteredPairsData;
  }

  return <div className="App"><AssetsList data = {assetsData}/></div>;
}

export default App;
