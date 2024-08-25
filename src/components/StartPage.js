import React, { useContext } from "react";
import { AppContext } from "../App";
import { Button } from "@mui/material";
function StartPage() {
  const { setStartGame } = useContext(AppContext);
  return (
    <div className="button-container" style={{ paddingTop: "100px" }}>
      <h1 style={{ fontSize: "45px" }}>Hi Wordler,</h1>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => setStartGame(false)}
      >
        Start
      </Button>
    </div>
  );
}

export default StartPage;
