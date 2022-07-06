import { AssetsData, AssetType } from "./types";
import "./assetsLists.css";
import React, { ReactNode} from "react";

function Asset(props: AssetType) {
  return (
    <div className="pair">
      <b>{props.baseAsset}</b>/{props.quoteAsset}
      {/* Type: {props.type} */}
    </div>
  );
}

export function AssetsList(props: { data: AssetsData }) {
  const { busdPairs, usdtPairs, futuresPairs } = props.data;

  const pairsNode = {busd: [] as ReactNode[], usdt:[] as ReactNode[], futures:[] as ReactNode[]}
  const {busd, usdt, futures} = pairsNode



  busdPairs.forEach(item => {busd.push(<Asset baseAsset={item.baseAsset} quoteAsset = {item.quoteAsset} type= {item.type}/>)})
  usdtPairs.forEach(item => {usdt.push(<Asset baseAsset={item.baseAsset} quoteAsset = {item.quoteAsset} type= {item.type}/>)})
  futuresPairs.forEach(item => {futures.push(<Asset baseAsset={item.baseAsset} quoteAsset = {item.quoteAsset} type= {item.type}/>)})

  

  return (
    <div>
      <h1>Spot pairs:</h1>
      <div>
        <h2>BUSD pairs:</h2>
        <div className="pairsRow">{busd}</div>
        <h2>USDT pairs:</h2>
        <div className="pairsRow">{usdt}</div>
      </div>
      <h1>Futures Pairs:</h1>
      <div className="pairsRow">{futures}</div>
    </div>
  );
}
