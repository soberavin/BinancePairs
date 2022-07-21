import "./App.css";
import { AssetsList } from "./components/assetsLists";
import SymbolsGlobalInfo from "./SymbolsGlobalInfo";


function App() {

const data = SymbolsGlobalInfo()

  return <div className="App">
    <AssetsList data = {data}/>
  </div>;
}

export default App;
