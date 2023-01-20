const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/perfData", {
  useNewUrlParser: true,
});

const Machine = require("./models/Machine");

function socketMain(io, socket) {
  //   console.log("A socket connected!", socket.id);
  let macA;

  socket.on("clientAuth", (key) => {
    if (key === "somesecureprivatekeyfornodeclient") {
      // valid node client
      socket.join("nodeClients");
    } else if (key === "somesecureprivatekeyforuiclient") {
      // valid UI
      console.log("A React client has joined.");
      socket.join("uiClients");

      Machine.find({}, (err, docs) => {
        docs.forEach((machine) => {
          // on load, assume all machines are inactive
          machine.isActive = false;
          io.to("uiClients").emit("perfData", machine);
        });
      });
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("initPerfData", async (initPerfData) => {
    macA = initPerfData.macA;

    const checkResp = await checkAndAddMacAddr(initPerfData);
    console.log(checkResp);
  });

  socket.on("perfData", (perfData) => {
    // console.log(perfData);
    io.to("uiClients").emit("perfData", perfData);
  });

  socket.on("disconnect", () => {
    Machine.find({ macA: macA }, (err, doc) => {
      if (doc.length > 0) {
        doc[0].isActive = false;
        io.to("uiClients").emit("perfData", doc[0]);
      }
    });
  });
}

function checkAndAddMacAddr(initPerfData) {
  return new Promise((resolve, reject) => {
    Machine.findOne(
      {
        macA: initPerfData.macA,
      },
      (err, doc) => {
        if (err) {
          throw err;
          //   reject(err);
        } else if (doc === null) {
          let newMachine = new Machine(initPerfData);
          newMachine.save();
          resolve("added");
        } else {
          resolve("found");
        }
      }
    );
  });
}

module.exports = socketMain;
