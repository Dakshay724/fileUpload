import React, { useEffect } from "react";
import FileUpload from "./components/FileUpload";
// import io from "socket.io-client";
// let socket = io.connect("http://localhost:5000");
// console.log(socket);

const App = () => {
  // socket.emit("clientAuth", "uihjt3refvdsadf");
  // useEffect(() => {
  //   socket.on("data", (data) => {});
  // }, []);
  return (
    <center>
      <div className="app-container">
        <FileUpload />
      </div>
    </center>
  );
};

export default App;
