import "./App.css";
import { Card } from "./Component/Card";

function App() {
  return (
    <div className=" flex min-h-screen w-full justify-center align-middle items-center bg-slate-400">
      <div className=" w-full md:w-96 h-96 flex justify-center items-center">
        <Card />
      </div>
    </div>
  );
}

export default App;
