import React from "react";

import "./style.css";
import Vector from "./Vector";
import SnakeGame from "./SnakeGame";
import Board from "./Board";

React.render(<SnakeGame boardSize={new Vector(20, 20)} />, document.getElementById("app"));
