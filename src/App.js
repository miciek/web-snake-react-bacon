import React, { Component } from 'react';
import Vector from "./Vector";
import SnakeGame from "./SnakeGame";

export default class App extends Component {
  render() {
    return <SnakeGame boardSize={new Vector(20, 20)} />;
  }
}
