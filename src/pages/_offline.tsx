import React from "react";
import Game from "@/components/Game";

const Offline: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <h1>You are offline</h1>
        <Game />
      </div>
    </div>
  );
};

export default Offline;
