import { AssetType, AssetsData } from "../types";
import "./assetsLists.css";
import React, { ReactNode} from "react";

function Asset(props: AssetType) {
  return (
    <div className="pair">
      <b>{props.baseAsset}</b>/{props.quoteAsset}
    </div>
  );
}

export function AssetsList(props: { data: AssetsData }) {
  const { busdPairs, usdtPairs, futuresPairs } = props.data;

  const pairsNode = {busd: [] as ReactNode[], usdt:[] as ReactNode[], futures:[] as ReactNode[]}
  const {busd, usdt, futures} = pairsNode



  busdPairs.forEach((item) => {busd.push(<Asset {...item} key = {item.myId}/>)})
  usdtPairs.forEach((item) => {usdt.push(<Asset {...item} key = {item.myId} />)})
  futuresPairs.forEach((item)=> {futures.push(<Asset {...item} key = {item.myId}/>)})

  

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
