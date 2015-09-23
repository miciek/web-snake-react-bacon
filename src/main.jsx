import "babel-core/polyfill"
import React from "react"

import "./style.css"
import Vector from "./Vector"
import SnakeGame from "./SnakeGame"

const DOM_APP_EL_ID = "app"

React.render(<SnakeGame boardSize={new Vector(20, 20)} />, document.getElementById(DOM_APP_EL_ID))
