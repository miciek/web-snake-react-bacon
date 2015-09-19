import "babel-core/polyfill"
import React from "react"

import "./style.css"
import Position from "./Position"
import SnakeGame from "./components/SnakeGame"

const DOM_APP_EL_ID = "app"

React.render(<SnakeGame boardSize={new Position(20, 20)} />, document.getElementById(DOM_APP_EL_ID))
