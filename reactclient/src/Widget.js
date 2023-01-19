import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

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
    } = this.props.perfData;

    const cpuData = { cpuLoad };
    const memData = { totalMem, usedMem, memUsage, freeMem };
    const infoData = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

    return (
      <>
        <Cpu cpuData={cpuData} />
        <Mem memData={memData} />
        <Info infoData={infoData} />
      </>
    );
  }
}

export default Widget;
