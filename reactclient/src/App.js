import { useState, useEffect } from "react";
import "./App.css";
import socket from "./utils/socketConn";
import Widget from "./Widget";

function App() {
  const [allPerfData, setAllPerfData] = useState({});

  useEffect(() => {
    socket.on("perfData", (perfData) => {
      const allPerfDataCp = { ...allPerfData };
      allPerfDataCp[perfData.macA] = perfData;

      setAllPerfData(allPerfDataCp);
    });
  }, [allPerfData]);

  useEffect(() => {
    console.log(allPerfData);
  }, [allPerfData]);

  return (
    <div className="App">
      {Object.entries(allPerfData).map(([key, value]) => {
        return <Widget key={key} perfData={value} />;
      })}
    </div>
  );
}

export default App;
