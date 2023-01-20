import React from "react";
import drawCircle from "./utils/canvasLoadAnimation";

function Cpu({ cpuData }) {
  const canvas = document.querySelector(`.${cpuData.cpuWidgetId}`);
  drawCircle(canvas, cpuData.cpuLoad);

  return (
    <div className="col-sm-3 cpu">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas
          className={cpuData.cpuWidgetId}
          width="200"
          height="200"
        ></canvas>
        <div className="cpu-text">{cpuData.cpuLoad}%</div>
      </div>
    </div>
  );
}

export default Cpu;
