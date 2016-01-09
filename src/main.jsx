import React from "react"

import "./style.css"
import Vector from "./Vector"
import SnakeGame from "./SnakeGame"
import MultiSnakeGame from "./MultiSnakeGame"
import Board from "./Board"
import Bacon from "baconjs"

// TODO: what happens when server is unavailable for a while and socket closes?
const ws = new WebSocket("ws://localhost:8080/snakeSocket")
const playerName = window.location.pathname.substr(1)

ws.onopen = () => {
  const gameEvents = Bacon.fromEvent(ws, "message").map(".data")

  const newSnakeCallback = (snakePositions) => {
    ws.send(JSON.stringify({ name: playerName, s: snakePositions }))
  }

  React.render(<MultiSnakeGame boardSize={new Vector(20, 20)} gameEvents={gameEvents} onNewSnake={newSnakeCallback} />, document.getElementById("app"))
}

// TODO: single or multiplayer mode switched by URL param
ws.onerror = () => {
  React.render(<SnakeGame boardSize={new Vector(20, 20)} />, document.getElementById("app"))
}
