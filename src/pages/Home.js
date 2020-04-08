import React from "react";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div id="App">
        {/* <header id="App-header">JOGO DA MEMÓRIA</header> */}

        <div id="jogo"></div>
        <button id="button"> press to start</button>
      </div>
    );
  }
}

export default Home;
