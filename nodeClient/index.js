const os = require("os");
const io = require("socket.io-client");
let socket = io("http://127.0.0.1:8181");

socket.on("connect", () => {
  //   console.log("Connected to server.");

  // identifier of this machine
  const nI = os.networkInterfaces();
  let macA;

  for (let key in nI) {
    if (!nI[key][0].internal) {
      macA = nI[key][0].mac;
      break;
    }
  }

  socket.emit("clientAuth", "somesecureprivatekeyfornodeclient");

  getPerformanceData().then((perfData) => {
    perfData.macA = macA;
    socket.emit("initPerfData", perfData);
  });

  let perfDataInterval = setInterval(() => {
    getPerformanceData().then((perfData) => {
      perfData.macA = macA;
      socket.emit("perfData", perfData);
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});

async function getPerformanceData() {
  return new Promise(async (resolve, reject) => {
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const osType = os.type() === "Darwin" ? "Mac" : os.type();
    const upTime = os.uptime();
    const cpus = os.cpus();

    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

    const cpuModel = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCPULoad();
    const isActive = true;

    resolve({
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
      isActive,
    });
  });
}

// calculate current average idle and total time across all cores
// from rebooting
function getCPUTimeAverage() {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    for (timeType in core.times) {
      totalMs += core.times[timeType];
    }

    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

// get current CPU load in percentage
function getCPULoad() {
  return new Promise((resolve, reject) => {
    const start = getCPUTimeAverage();
    setTimeout(() => {
      const end = getCPUTimeAverage();
      const idleDelta = end.idle - start.idle;
      const totalDelta = end.total - start.total;

      const loadInPercent = 100 - Math.floor((100 * idleDelta) / totalDelta);
      resolve(loadInPercent);
    }, 100);
  });
}

/**
 * - CPU Load
 * - Memory Usage:
 *  + free
 *  + total
 * - OS
 * - Uptime
 * - CPU Info:
 *  + Type
 *  + # cores
 *  + Clock speed
 */

// getPerformanceData().then((perfData) => {
//   console.log(perfData);
// });
