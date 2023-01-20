import React from "react";
import moment from "moment";

function Info({ infoData }) {
  return (
    <div className="col-sm-3 col-sm-offset-1 cpu-info">
      <h3>Operating System</h3>
      <div className="widget-text">{infoData.osType}</div>
      <h3>Time Online</h3>
      <div className="widget-text">
        {moment.duration(infoData.upTime).humanize()}
      </div>
      <h3>Processor Information</h3>
      <div className="widget-text">
        <strong>Type:</strong> {infoData.cpuModel}
      </div>
      <div className="widget-text">
        <strong>Number of Cores:</strong> {infoData.cpuNumCores}
      </div>
      <div className="widget-text">
        <strong>Clock Speed:</strong> {infoData.cpuSpeed}
      </div>
    </div>
  );
}

export default Info;
