import { AssetType } from "../types";

export default function filterFutSymbols(obj: any) {

    const filteredSymbolsData: AssetType[] = []

    for (let i = 0; i < obj.length; i++) {
        const { status, quoteAsset, baseAsset } =
            obj[i];

        if (status === "TRADING" && baseAsset !== "TUSD") {
            if (quoteAsset === "USDT") {

                let futuresAsset: AssetType = {
                    baseAsset,
                    quoteAsset,
                    type: "FUTURES",
                    myId: i
                }

                filteredSymbolsData.push(futuresAsset);
            }


        }
    }
    return filteredSymbolsData;
}
