import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./Widget.css";

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      macA,
      isActive,
    } = this.props.perfData;

    const macANoColon = macA.replaceAll(":", "");
    const cpuWidgetId = `cpu-widget-${macANoColon}`;
    const memWidgetId = `mem-widget-${macANoColon}`;

    const cpuData = { cpuLoad, cpuWidgetId };
    const memData = { totalMem, usedMem, memUsage, freeMem, memWidgetId };
    const infoData = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

    let notActiveDiv = "";
    if (!isActive) {
      notActiveDiv = <div className="not-active">Offline</div>;
    }

    return (
      <div className="widget col-sm-12">
        {notActiveDiv}
        <Cpu cpuData={cpuData} />
        <Mem memData={memData} />
        <Info infoData={infoData} />
      </div>
    );
  }
}

export default Widget;
