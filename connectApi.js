const socketIO = require("socket.io-client");

removeEventListener = function (...args) {};

addEventListener("lr_cashshop:startApi", (token) => {
  const socket = socketIO(`https://api.lorax.vn/sepay_${token}`);

  socket.on("connect", () => {
    console.log("connect");
  });
  socket.on("message", (payload) => {
    console.log("message", payload);
    emit("sepay:onMessage", payload);
  });
});
