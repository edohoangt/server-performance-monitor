import React from "react";
import drawCircle from "./utils/canvasLoadAnimation";

function Mem({ memData }) {
  const { totalMem, freeMem, memUsage } = memData;
  const memCanvas = document.querySelector(`.${memData.memWidgetId}`);
  drawCircle(memCanvas, memUsage * 100);

  const totalMemGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemGB = Math.floor((freeMem / 1073741824) * 100) / 100;

  return (
    <div className="col-sm-3 mem">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas
          className={memData.memWidgetId}
          width="200"
          height="200"
        ></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
      </div>
      <div>Total Memory: {totalMemGB} GB</div>
      <div>Free Memory: {freeMemGB} GB</div>
    </div>
  );
}

export default Mem;
