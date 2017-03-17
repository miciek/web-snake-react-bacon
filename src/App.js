import React, { Component } from 'react';
import Vector from "./Vector";
import SnakeGame from "./SnakeGame";
import "./style.css";

class App extends Component {
  render() {
    return <SnakeGame boardSize={new Vector(20, 20)} />;
  }
}

export default App;
